# Use Python base image
FROM python:3.10-slim

# Install OS dependencies
RUN apt-get update && apt-get install -y \
    curl build-essential \
    libglib2.0-0 libsm6 libxext6 libxrender1 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

# Copy Python requirements first
COPY requirements.txt /app/

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy ALL backend code
COPY . /app/

# ⭐ VERY VERY IMPORTANT — Copy model folder explicitly
COPY model /app/model

# Install Node dependencies
RUN npm install --production

# Expose backend port
EXPOSE 5000

# Start Node server
CMD ["node", "server.js"]
