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

# Set working directory
WORKDIR /app

# Copy python dependencies first
COPY requirements.txt /app/

# Install Python packages (including tflite-runtime)
RUN pip install --no-cache-dir -r requirements.txt

# Copy full backend code
COPY . /app/

# Install Node dependencies
RUN npm install --production

# Expose correct port
EXPOSE 5000

# Start Node backend
CMD ["node", "server.js"]
