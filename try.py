import torch
print(torch.__version__)  # Should print 2.1.0+cu121
print("CUDA available:", torch.cuda.is_available())  # Should print True
print("CUDA version:", torch.version.cuda)  # Should print 12.1
print("GPU Name:", torch.cuda.get_device_name(0))  # Should print your GPU name