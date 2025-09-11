# Use Python 3.10 slim for compatibility
FROM python:3.10-slim

# Install FFmpeg and build dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements.txt from the root directory
COPY ../requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend source code
COPY src/ .

# Expose the port Render will assign
EXPOSE $PORT

# Start command (adjust based on your framework)
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "app:app", "--bind", "0.0.0.0:$PORT"]