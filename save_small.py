from audiocraft.models import MusicGen
<<<<<<< HEAD
import torch

# Load the pretrained MusicGen model
musicgen = MusicGen.get_pretrained('facebook/musicgen-small')

# Save the underlying model weights
torch.save(musicgen.lm.state_dict(), "save_small.pt")
=======
import torch 

model = MusicGen.get_pretrained('facebook/musicgen-small')

torch.save(model.lm.state_dict(),'small_model.pt')
>>>>>>> 00807cd (new)
