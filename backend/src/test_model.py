import torch
from audiocraft.models import MusicGen
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.debug(f"PyTorch: {torch.__version__}, CUDA: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    logger.debug(f"CUDA version: {torch.version.cuda}, GPU: {torch.cuda.get_device_name(0)}")

try:
    logger.debug("Pre-caching MusicGen model...")
    MusicGen.get_pretrained('small')
    logger.debug("Loading MusicGen model...")
    model = MusicGen.get_pretrained('small', device='cuda' if torch.cuda.is_available() else 'cpu')
    logger.debug(f"Model loaded: {model is not None}")
except Exception as e:
    logger.error(f"Error: {str(e)}")
    import traceback
    traceback.print_exc()