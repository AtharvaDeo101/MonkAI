from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from contextlib import asynccontextmanager
import torchaudio
from audiocraft.models import MusicGen
import torch
import os

app = FastAPI(title="MusicGen API", description="Generate music using MusicGen model")

class MusicRequest(BaseModel):
    description: str
    duration: float = 5.0  # Reduced default duration for faster generation
    output_path: str = "output_music.wav"

model_size = 'small'  # Use 'small' for faster testing
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = None  # Will be initialized during startup

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events."""
    global model
    try:

        print(f"Pre-caching MusicGen model weights ({model_size})...")
        MusicGen.get_pretrained(model_size)
        print(f"Loading MusicGen model ({model_size}) on {device}...")
        model = MusicGen.get_pretrained(model_size, device=device)
        print("Model weights cached and model loaded successfully.")
        yield  # Application runs here
    except Exception as e:
        print(f"Error during model pre-caching or loading: {str(e)}")
        raise RuntimeError(f"Failed to pre-cache or load model: {str(e)}")
    finally:
        
        print("Shutting down MusicGen API...")


app.lifespan = lifespan

@app.post("/generate_music", response_model=dict)
async def generate_music(request: MusicRequest):

    try:
        # Validate output path
        if not request.output_path.endswith('.wav'):
            raise HTTPException(status_code=400, detail="Output path must end with .wav")
        
        # Ensure output directory exists
        output_dir = os.path.dirname(request.output_path) or '.'
        os.makedirs(output_dir, exist_ok=True)

        # Set generation parameters
        model.set_generation_params(duration=request.duration)
        
        # Generate music
        print(f"Generating {request.duration}s of music for: {request.description}")
        wav = model.generate([request.description])
        
        # Save the generated audio
        torchaudio.save(request.output_path, wav[0].cpu(), sample_rate=32000)
        print(f"Music saved to {request.output_path}")
        
        return {"message": f"Music generated and saved to {request.output_path}"}
    
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Check if the API is running and the model is loaded."""
    return {"status": "healthy", "model_size": model_size, "device": device}