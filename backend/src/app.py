from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from contextlib import asynccontextmanager
import torchaudio
from audiocraft.models import MusicGen
import torch
import os
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI(title="MusicGen API", description="Generate music using MusicGen model")

# Serve static files from the 'generated' directory
app.mount("/generated", StaticFiles(directory="generated"), name="generated")

# Add CORS middleware to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MusicRequest(BaseModel):
    description: str
    duration: float = 15.0
    fileName: str | None = None

model_size = 'small'
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = None

@asynccontextmanager
async def lifespan(app: FastAPI):

    global model
    try:
        # Ensure generated directory exists
        os.makedirs("generated", exist_ok=True)
        logger.debug(f"Environment: PyTorch {torch.__version__}, CUDA available: {torch.cuda.is_available()}, Device: {device}")
        if device == 'cuda':
            logger.debug(f"CUDA version: {torch.version.cuda}, GPU: {torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'None'}")
        
        logger.debug(f"Attempting to pre-cache MusicGen model weights ({model_size})...")
        try:
            MusicGen.get_pretrained(model_size)
            logger.debug("Pre-caching successful")
        except Exception as e:
            logger.error(f"Pre-caching failed: {str(e)}")
            raise
        
        logger.debug(f"Loading MusicGen model ({model_size}) on {device}...")
        model = MusicGen.get_pretrained(model_size, device=device)
        if model is None:
            logger.error("Model loading returned None")
            raise ValueError("MusicGen model loading returned None")
        
        logger.info("Model weights cached and model loaded successfully.")
        yield
    except Exception as e:
        logger.error(f"Error during model pre-caching or loading: {str(e)}")
        import traceback
        traceback.print_exc()
        raise RuntimeError(f"Failed to pre-cache or load model: {str(e)}")
    finally:
        logger.info("Shutting down MusicGen API...")

app.lifespan = lifespan

@app.post("/generate_music", response_model=dict)
async def generate_music(request: MusicRequest):
    try:
        if model is None:
            logger.error("Model is not initialized")
            raise HTTPException(status_code=500, detail="Model is not initialized")
        
        file_name = request.fileName if request.fileName else "generated-track"
        if not file_name.endswith('.wav'):
            file_name += '.wav'
        output_path = os.path.join("generated", file_name)
        
        os.makedirs("generated", exist_ok=True)

        model.set_generation_params(duration=request.duration)
        
        logger.info(f"Generating {request.duration}s of music for: {request.description}")
        wav = model.generate([request.description])
        
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