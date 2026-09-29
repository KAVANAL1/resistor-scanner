# FORCE REBUILD — change this number every time you deploy if needed
ARG FORCE_REBUILD=3

FROM python:3.10-slim

# Disable Python .pyc and ensure realtime logs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install OS dependencies required by OpenCV, TFLite & Node
RUN apt-get update && apt-get install -y \
    curl build-essential \
    libglib2.0-0 libsm6 libxext6 libxrender1 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js (required for server.js)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

# Copy only Python requirements first (improves caching)
COPY requirements.txt /app/

# 🔥 VERY IMPORTANT: Remove any old NumPy, then install the correct version
RUN pip install --no-cache-dir --upgrade pip \
 && pip uninstall -y numpy || true \
 && pip install --no-cache-dir numpy==1.26.4 \
 && pip install --no-cache-dir --force-reinstall -r requirements.txt

# Copy full backend into the container
COPY . /app/

# Explicitly copy model directory (Render sometimes skips binary files)
COPY model /app/model

# Log model presence during build
RUN python - <<'PY'
import os
p = '/app/model/model.tflite'
print("MODEL_EXISTS (build):", os.path.exists(p))
if os.path.exists(p):
    print("MODEL_SIZE (build):", os.path.getsize(p), "bytes")
PY

# Install Node dependencies
RUN npm install --production

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["node", "server.js"]
