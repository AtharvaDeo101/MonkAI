import torchaudio
from audiocraft.models import MusicGen
from audiocraft.data.audio import audio_write

model = MusicGen.get_pretrained('facebook/musicgen-small')
model.set_generation_params(duration=10)

desc = ['flute']

wav = model.generate(desc)

torchaudio.save('Output.wav',wav[0].cpu(),sample_rate = 32000)