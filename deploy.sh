#!/bin/bash

# Stop existing containers
docker-compose down

# Pull latest changes (if using git on server)
# git pull origin main

# Build and start containers
docker-compose up -d --build

# Show logs
docker-compose logs -f
