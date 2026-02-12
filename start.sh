#!/bin/bash

# AI Apply - Start Script
# This script starts all services for local development

echo "🚀 Starting AI Apply - Intelligent Job Application System"
echo "=========================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}⚠️  Virtual environment not found. Creating one...${NC}"
    python3 -m venv venv
    echo -e "${GREEN}✅ Virtual environment created${NC}"
fi

# Activate virtual environment
echo -e "${BLUE}📦 Activating virtual environment...${NC}"
source venv/bin/activate

# Install/update Python dependencies
echo -e "${BLUE}📦 Installing Python dependencies...${NC}"
pip install -q -r requirements.txt
echo -e "${GREEN}✅ Python dependencies installed${NC}"
echo ""

# Check if frontend node_modules exists
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Frontend dependencies not found. Installing...${NC}"
    cd frontend
    npm install
    cd ..
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
    echo ""
fi

# Create necessary directories
mkdir -p backend/logs
mkdir -p logs
mkdir -p backend/data
mkdir -p data

# Start Backend Server
echo -e "${BLUE}🔧 Starting Backend Server (Port 8000)...${NC}"
python run.py > backend/logs/application.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > .backend.pid
echo -e "${GREEN}✅ Backend server started (PID: $BACKEND_PID)${NC}"
echo ""

# Wait for backend to be ready
echo -e "${BLUE}⏳ Waiting for backend to be ready...${NC}"
sleep 3

# Check if backend is running
if curl -s http://localhost:8000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is ready at http://localhost:8000${NC}"
else
    echo -e "${YELLOW}⚠️  Backend may still be starting up...${NC}"
fi
echo ""

# Start Frontend Server
echo -e "${BLUE}🎨 Starting Frontend Server (Port 3000)...${NC}"
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../.frontend.pid
cd ..
echo -e "${GREEN}✅ Frontend server started (PID: $FRONTEND_PID)${NC}"
echo ""

# Wait for frontend to be ready
echo -e "${BLUE}⏳ Waiting for frontend to be ready...${NC}"
sleep 3
echo ""

# Start Sandbox Portal (Optional)
echo -e "${BLUE}🏖️  Starting Sandbox Job Portal (Port 5001)...${NC}"
python sandbox/job_portal.py > logs/sandbox.log 2>&1 &
SANDBOX_PID=$!
echo $SANDBOX_PID > .sandbox.pid
echo -e "${GREEN}✅ Sandbox portal started (PID: $SANDBOX_PID)${NC}"
echo ""

# Summary
echo "=========================================================="
echo -e "${GREEN}🎉 All services started successfully!${NC}"
echo "=========================================================="
echo ""
echo -e "${BLUE}📍 Service URLs:${NC}"
echo -e "   🔧 Backend API:      ${GREEN}http://localhost:8000${NC}"
echo -e "   🎨 Frontend App:     ${GREEN}http://localhost:3000${NC}"
echo -e "   🏖️  Sandbox Portal:   ${GREEN}http://localhost:5001${NC}"
echo ""
echo -e "${BLUE}📋 Useful Endpoints:${NC}"
echo -e "   • Backend Health:    http://localhost:8000/api/health"
echo -e "   • API Docs:          http://localhost:8000/docs"
echo -e "   • Sandbox Jobs:      http://localhost:5001/jobs"
echo -e "   • Post Job:          http://localhost:5001/company/post-job"
echo ""
echo -e "${BLUE}📝 Log Files:${NC}"
echo -e "   • Backend:           backend/logs/application.log"
echo -e "   • Frontend:          logs/frontend.log"
echo -e "   • Sandbox:           logs/sandbox.log"
echo ""
echo -e "${BLUE}🛑 To stop all services:${NC}"
echo -e "   Run: ${YELLOW}./stop.sh${NC}"
echo ""
echo -e "${BLUE}💡 Quick Start:${NC}"
echo -e "   1. Open ${GREEN}http://localhost:3000${NC} in your browser"
echo -e "   2. Register a new account or login"
echo -e "   3. Upload your resume"
echo -e "   4. Browse AI-ranked jobs"
echo -e "   5. Run autopilot to apply automatically"
echo ""
echo "=========================================================="
