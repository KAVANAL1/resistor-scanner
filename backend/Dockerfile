# Use Python base image
FROM python:3.10-slim

# disable pycache for smaller image
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ARG to force cache-bust on rebuilds (increment value to force fresh build)
ARG CACHEBUST=1

# Install OS dependencies
RUN apt-get update && apt-get install -y \
    curl build-essential \
    libglib2.0-0 libsm6 libxext6 libxrender1 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js (needed because your server is Node + Python)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

# Copy only requirements first (faster cache)
COPY requirements.txt /app/

# Upgrade pip then install a pinned numpy BEFORE other packages
# This ensures we get numpy 1.x (compatible with tflite-runtime)
RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir numpy==1.26.4 \
 && pip install --no-cache-dir --upgrade --force-reinstall -r requirements.txt

# Copy backend code into container
COPY . /app/

# Ensure model folder is copied explicitly (very important)
COPY model /app/model

# Optional: log filesize of model at build (useful when debugging builds)
RUN python - <<'PY'
import os
p = '/app/model/model.tflite'
print('MODEL_EXISTS', os.path.exists(p))
if os.path.exists(p):
    print('MODEL_SIZE', os.path.getsize(p))
PY

# Install node dependencies
RUN npm install --production

# Expose backend port (server reads PORT env, this is just informative)
EXPOSE 5000

# Start Node server
CMD ["node", "server.js"]
