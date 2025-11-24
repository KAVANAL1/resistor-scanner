# Use Python base image
FROM python:3.10-slim

# Install OS packages including Node.js & OpenCV libs
RUN apt-get update && apt-get install -y \
    curl build-essential \
    libglib2.0-0 libsm6 libxext6 libxrender1 && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory INSIDE backend folder
WORKDIR /app

# Copy ONLY requirements first (for caching)
COPY requirements.txt .

# Install Python deps
RUN pip install --no-cache-dir -r requirements.txt

# Now copy the rest of the backend code
COPY . .

# Install Node dependencies
RUN npm install --production

EXPOSE 3000

CMD ["node", "server.js"]
