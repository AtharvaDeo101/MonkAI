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
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.debug("Starting FastAPI application setup")

model_size = 'small'
device = 'cuda' if torch.cuda.is_available() else 'cpu'

model = None
JAMENDO_CLIENT_ID = os.getenv("JAMENDO_CLIENT_ID")

load_dotenv()
logger.debug(f"JAMENDO_CLIENT_ID: {os.getenv('JAMENDO_CLIENT_ID')}")


# Validate environment variables
if not JAMENDO_CLIENT_ID:
    logger.error("JAMENDO_CLIENT_ID not set in .env file")
    raise ValueError("JAMENDO_CLIENT_ID is required")

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

# Request model for MusicGen
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
            "fileName": file_name,
            "audioUrl": f"/generated/{file_name}"
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

@app.get("/jamendo/tracks")
async def get_jamendo_tracks(q: str = "", limit: int = 20):
    try:
        async with aiohttp.ClientSession() as session:
            params = {
                "client_id": JAMENDO_CLIENT_ID,
                "format": "json",
                "limit": limit,
                "include": "musicinfo",
                "order": "popularity_total"
            }
            if q:  # Only include tags if q is non-empty
                params["tags"] = q
            logger.debug(f"Fetching Jamendo tracks with params: {params}")
            for attempt in range(3):  # Retry logic for transient errors
                try:
                    async with session.get("https://api.jamendo.com/v3.0/tracks/", params=params) as response:
                        if response.status != 200:
                            error_text = await response.text()
                            logger.error(f"Jamendo API error: {response.status} - {error_text}")
                            raise HTTPException(status_code=response.status, detail=f"Jamendo API error: {error_text}")
                        data = await response.json()
                        if data["headers"]["status"] != "success":
                            error_message = data["headers"].get("error_message", "Unknown error")
                            logger.error(f"Jamendo API error: {error_message}")
                            raise HTTPException(status_code=500, detail=f"Jamendo API error: {error_message}")
                        
                        tracks = []
                        for item in data.get("results", []):
                            tracks.append({
                                "id": item["id"],
                                "title": item["name"],
                                "artist": item["artist_name"],
                                "duration": f"{item['duration'] // 60}:{item['duration'] % 60:02d}",
                                "cover": item.get("album_image", "/placeholder.svg?height=80&width=80"),
                                "tags": item.get("musicinfo", {}).get("tags", {}).get("genres", []) or [],
                                "plays": str(item.get("stats", {}).get("playcounts", 0)),
                                "color": "from-[#5F85DB] to-[#7B68EE]",
                                "audioUrl": item["audio"],
                                "attribution": {
                                    "required": True,
                                    "text": f"Music by {item['artist_name']} on Jamendo",
                                    "link": item["shareurl"],
                                }
                            })
                        logger.info(f"Fetched {len(tracks)} tracks from Jamendo")
                        return {"tracks": tracks}
                except aiohttp.ClientError as e:
                    if attempt < 2:
                        logger.warning(f"Retrying Jamendo request (attempt {attempt + 1}/3): {str(e)}")
                        time.sleep(2 ** attempt)
                        continue
                    raise HTTPException(status_code=503, detail=f"Network error: {str(e)}")
    except Exception as e:
        logger.error(f"Error fetching Jamendo tracks: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch tracks: {str(e)}")