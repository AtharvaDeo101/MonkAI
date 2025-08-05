import os
import logging
import torch
import torchaudio
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from contextlib import asynccontextmanager
from audiocraft.models import MusicGen
import aiohttp
import urllib.parse
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.debug("Starting FastAPI application setup")

model_size = 'small'
device = 'cuda' if torch.cuda.is_available() else 'cpu'

model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    logger.debug("Entering lifespan handler")
    try:
        logger.debug("Creating generated directory")
        os.makedirs("generated", exist_ok=True)
        
        logger.debug(f"Environment: PyTorch {torch.__version__}, CUDA available: {torch.cuda.is_available()}, Device: {device}")
        if device == 'cuda':
            logger.debug(f"CUDA version: {torch.version.cuda}, GPU: {torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'None'}")
        
        logger.debug(f"Attempting to load MusicGen model ({model_size}) on {device}...")
        model = MusicGen.get_pretrained(model_size, device=device)
        if model is None:
            logger.error("Model loading returned None")
            raise ValueError("MusicGen model loading returned None")
        
        logger.info("Model loaded successfully")
        yield
    except Exception as e:
        logger.error(f"Error in lifespan: {str(e)}")
        import traceback
        traceback.print_exc()
        raise RuntimeError(f"Failed to initialize model: {str(e)}")
    finally:
        logger.info("Shutting down MusicGen API...")

# Define FastAPI app
app = FastAPI(
    title="MusicGen API",
    description="Generate and fetch royalty-free music",
    lifespan=lifespan
)

app.mount("/generated", StaticFiles(directory="generated"), name="generated")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class MusicRequest(BaseModel):
    description: str
    duration: float = 15.0
    fileName: str | None = None

# Dependency to check model
async def get_model():
    if model is None:
        raise HTTPException(status_code=503, detail="Model is not initialized")
    return model

@app.post("/generate_music", response_model=dict)
async def generate_music(request: MusicRequest, _=Depends(get_model)):
    try:
        file_name = request.fileName if request.fileName else "generated-track"
        if not file_name.endswith('.wav'):
            file_name += '.wav'
        output_path = os.path.join("generated", file_name)
        
        logger.debug("Ensuring generated directory exists")
        os.makedirs("generated", exist_ok=True)

        logger.debug(f"Setting generation params: duration={request.duration}")
        model.set_generation_params(duration=request.duration)
        
        logger.info(f"Generating {request.duration}s of music for: {request.description}")
        wav = model.generate([request.description])
        
        logger.debug(f"Saving audio to {output_path}")
        torchaudio.save(output_path, wav[0].cpu(), sample_rate=32000)
        logger.info(f"Music saved to {output_path}")
        
        return {
            "message": f"Music generated and saved to {output_path}",
            "fileName": file_name
        }
    
    except Exception as e:
        logger.error(f"Error in generate_music: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_size": model_size, "device": device, "model_loaded": model is not None}

@app.get("/generated/{file_name}")
async def serve_audio(file_name: str):
    file_path = os.path.join("generated", file_name)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    logger.debug(f"Serving audio file: {file_path}")
    return FileResponse(file_path, media_type="audio/wav", headers={"Accept-Ranges": "bytes", "Content-Length": str(os.path.getsize(file_path))})

async def download_audio(audio_url: str, file_name: str, api_key: str) -> str:
    output_path = os.path.join("generated", file_name)
    async with aiohttp.ClientSession() as session:
        async with session.get(audio_url, headers={"x-freepik-api-key": api_key}) as resp:
            if resp.status == 200:
                with open(output_path, 'wb') as f:
                    f.write(await resp.read())
                return output_path
            raise HTTPException(status_code=500, detail=f"Failed to download audio: {await resp.text()}")

@app.get("/freepik/tracks")
async def get_freepik_tracks(q: str = "music", per_page: int = 20):
    api_key = os.getenv('FREEPIK_API_KEY')
    if not api_key:
        logger.error("FREEPIK_API_KEY environment variable not set")
        raise HTTPException(status_code=500, detail="Freepik API key not configured")
    
    logger.debug(f"FREEPIK_API_KEY: {api_key[:4]}**** (masked for security)")
    logger.debug(f"Fetching Freepik tracks with query: q={q}, per_page={per_page}, type of per_page: {type(per_page)}")
    
    try:
        async with aiohttp.ClientSession() as session:
            encoded_query = urllib.parse.quote(q)
            url = f"https://api.freepik.com/v1/resources?term={encoded_query}&content_type=audio&per_page={per_page}"
            headers = {"x-freepik-api-key": api_key}
            logger.debug(f"Requesting Freepik API: {url}")
            async with session.get(url, headers=headers) as response:
                if response.status != 200:
                    response_text = await response.text()
                    logger.error(f"Freepik API request failed with status {response.status}: {response_text}")
                    raise HTTPException(status_code=response.status, detail=f"Failed to fetch tracks from Freepik: {response_text}")
                
                data = await response.json()
                logger.debug(f"Freepik API response: {data}")
                if 'data' not in data:
                    logger.error("Invalid response format from Freepik API")
                    raise HTTPException(status_code=500, detail="Invalid response from Freepik API: 'data' not found")
                
                tracks = []
                for hit in data.get('data', []):
                    duration_secs = hit.get('duration', 0)
                    license_type = hit.get('licenses', [{}])[0].get('type', 'freemium')
                    attribution_required = license_type in ['freemium'] and 'premium' not in hit.get('products', [])
                    audio_url = hit.get('audio', hit.get('url', ''))
                    track = {
                        'id': hit.get('id'),
                        'title': hit.get('title', 'Untitled Track'),
                        'artist': hit.get('author', {}).get('name', 'Unknown Artist'),
                        'duration': f"{duration_secs // 60}:{str(duration_secs % 60).zfill(2)}",
                        'cover': hit.get('image', {}).get('source', {}).get('url', '/placeholder.svg?height=80&width=80'),
                        'tags': [tag.strip() for tag in hit.get('keywords', []) if tag.strip()],
                        'plays': str(hit.get('stats', {}).get('downloads', 0)),
                        'color': "from-[#5F85DB] to-[#7B68EE]",
                        'audioUrl': '',
                        'attribution': {
                            'required': attribution_required,
                            'text': 'Music by Freepik',
                            'link': 'https://www.freepik.com/audio'
                        } if attribution_required else None
                    }
                    if audio_url:
                        audio_path = await download_audio(audio_url, f"{hit.get('id')}.mp3", api_key)
                        track['audioUrl'] = f"/generated/{hit.get('id')}.mp3"
                    tracks.append(track)
                
                logger.info(f"Successfully fetched {len(tracks)} tracks from Freepik")
                return {'tracks': tracks}
    
    except ValueError as ve:
        logger.error(f"ValueError in get_freepik_tracks: {str(ve)}")
        raise HTTPException(status_code=400, detail=f"Invalid query parameter: {str(ve)}")
    except Exception as e:
        logger.error(f"Error fetching Freepik tracks: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch tracks: {str(e)}")

@app.get("/download/{track_id}")
async def download_track(track_id: str):
    file_path = os.path.join("generated", f"{track_id}.mp3")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Track not found")
    return FileResponse(file_path, media_type="audio/mp3", filename=f"{track_id}.mp3")