# backend/Dockerfile
FROM python:3.10-slim

# Install Node.js and libraries needed by OpenCV
RUN apt-get update && apt-get install -y curl build-essential \
  libglib2.0-0 libsm6 libxext6 libxrender1 && \
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
  apt-get install -y nodejs && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# Create app dir and set working directory to backend
WORKDIR /app/backend

# Copy package.json first for faster npm install
COPY backend/package*.json ./

# Install node deps (production)
RUN npm install --production

# Copy rest of backend files
COPY backend/ ./

# Install python deps (from backend/requirements.txt)
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your server expects
EXPOSE 3000

# Run your node server (server.js uses process.env.PORT)
CMD ["node", "server.js"]
