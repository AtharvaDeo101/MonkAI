# test_model.py
import logging
from audiocraft.models import MusicGen
import torch

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

model_size = 'small'
device = 'cuda' if torch.cuda.is_available() else 'cpu'

try:
    logger.debug(f"Environment: PyTorch {torch.__version__}, CUDA available: {torch.cuda.is_available()}, Device: {device}")
    logger.debug(f"Loading MusicGen model ({model_size}) on {device}...")
    model = MusicGen.get_pretrained(model_size, device=device)
    if model is None:
        logger.error("Model loading returned None")
    else:
        logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    import traceback
    traceback.print_exc()