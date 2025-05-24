from audiocraft.models import MusicGen
import torch

# Load the pretrained MusicGen model
musicgen = MusicGen.get_pretrained('facebook/musicgen-small')

# Save the underlying model weights
torch.save(musicgen.lm.state_dict(), "medium.pt")
