#!/bin/bash

# AI Apply Deployment Script
set -e

echo "🚀 Starting AI Apply Deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p data logs

# Copy environment files if they don't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your configuration before running again."
    exit 1
fi

if [ ! -f frontend/.env ]; then
    echo "📝 Creating frontend .env file from example..."
    cp frontend/.env.example frontend/.env
fi

# Build and start services
echo "🏗️  Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Health checks
echo "🔍 Checking service health..."

# Check backend
if curl -f http://localhost:8001/ > /dev/null 2>&1; then
    echo "✅ Backend is running"
else
    echo "❌ Backend health check failed"
    docker-compose logs backend
fi

# Check frontend
if curl -f http://localhost/ > /dev/null 2>&1; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend health check failed"
    docker-compose logs frontend
fi

# Check sandbox
if curl -f http://localhost:5001/api/portal/status > /dev/null 2>&1; then
    echo "✅ Sandbox portal is running"
else
    echo "❌ Sandbox portal health check failed"
    docker-compose logs sandbox
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📱 Access your application:"
echo "   Frontend:       http://localhost"
echo "   Backend API:    http://localhost:8001"
echo "   Sandbox Portal: http://localhost:5001"
echo ""
echo "📊 Useful commands:"
echo "   View logs:      docker-compose logs -f"
echo "   Stop services:  docker-compose down"
echo "   Restart:        docker-compose restart"
echo "   Update:         git pull && docker-compose up -d --build"
echo ""