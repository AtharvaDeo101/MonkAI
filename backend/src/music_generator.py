import torchaudio
from audiocraft.models import MusicGen
import torch

def generate_music(model, description, output_path, duration=10):
    try:
        model.set_generation_params(duration=duration)     
        print(f"Generating {duration}s of music for: {description}")
        wav = model.generate([description])
        
        torchaudio.save(output_path, wav[0].cpu(), sample_rate=32000)
        print(f"Music saved to {output_path}")
    
    except Exception as e:
        print(f"Error: {str(e)}")

def main():
    model_size = 'medium'  # Use 'small' for faster testing
    device = 'cuda' if torch.cuda.is_available() else 'cpu'

    print(f"Loading MusicGen model ({model_size}) on {device}...")
    model = MusicGen.get_pretrained(model_size, device=device)

    while True:
        description = input("Enter music description (or 'quit' to exit): ")

        if description.lower() == 'quit':
            break

        output_path = input("Enter output file path (e.g., 'output_music.wav'): ")
        duration = float(input("Enter duration in seconds (e.g., 10): "))
        
        generate_music(model, description, output_path, duration)

if __name__ == "__main__":
      main()