# Base image with Node + Python
FROM python:3.10-slim

# Install Node
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Install OpenCV dependencies
RUN apt-get update && apt-get install -y \
    libglib2.0-0 libsm6 libxext6 libxrender1 && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy backend files
COPY . .

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Install Node packages
RUN npm install

# Expose port
EXPOSE 3000

# Start Node server
CMD ["node", "server.js"]
