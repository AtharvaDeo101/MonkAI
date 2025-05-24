import torchaudio
from audiocraft.models import MusicGen
import torch

def generate_music(description, output_path, model_size='small'):
    # Initialize the MusicGen model with the appropriate configuration
    model = MusicGen.get_pretrained(f'facebook/musicgen-{model_size}', device='cuda' if torch.cuda.is_available() else 'cpu')
    
    # Load the saved model weights
    model_path = f'{model_size}_model.pt'
    if not torch.cuda.is_available():
        state_dict = torch.load(model_path, map_location=torch.device('cpu'))
    else:
        state_dict = torch.load(model_path)
    model.lm.load_state_dict(state_dict)
    
    # Set generation parameters
    model.set_generation_params(duration=10)
    
    # Generate music based on the description
    wav = model.generate([description])
    
    # Save the generated audio to the specified path
    torchaudio.save(output_path, wav[0].cpu(), sample_rate=32000)