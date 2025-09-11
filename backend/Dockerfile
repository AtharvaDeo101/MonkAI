# Use Python 3.10 slim for compatibility with audiocraft and av
FROM python:3.10-slim

# Install FFmpeg and build dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    pkg-config \
    libavformat-dev \
    libavcodec-dev \
    libavdevice-dev \
    libavutil-dev \
    libavfilter-dev \
    libswscale-dev \
    libswresample-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements.txt from backend/src/
COPY src/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend source code
COPY src/ .

# Create directory for generated audio files
RUN mkdir -p generated

# Expose the port assigned by Render
EXPOSE 8000

# Start command for FastAPI with Gunicorn and Uvicorn, using PORT env var
CMD ["sh", "-c", "gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app --bind 0.0.0.0:$PORT"]