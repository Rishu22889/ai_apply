#!/bin/bash

# AI Apply - Stop Script
# This script stops all running services

echo "🛑 Stopping AI Apply Services"
echo "=========================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to stop a service
stop_service() {
    local SERVICE_NAME=$1
    local PID_FILE=$2
    
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p $PID > /dev/null 2>&1; then
            echo -e "${YELLOW}🛑 Stopping $SERVICE_NAME (PID: $PID)...${NC}"
            kill $PID 2>/dev/null
            sleep 1
            
            # Force kill if still running
            if ps -p $PID > /dev/null 2>&1; then
                echo -e "${YELLOW}   Force stopping $SERVICE_NAME...${NC}"
                kill -9 $PID 2>/dev/null
            fi
            
            echo -e "${GREEN}✅ $SERVICE_NAME stopped${NC}"
        else
            echo -e "${YELLOW}⚠️  $SERVICE_NAME was not running${NC}"
        fi
        rm -f "$PID_FILE"
    else
        echo -e "${YELLOW}⚠️  $SERVICE_NAME PID file not found${NC}"
    fi
}

# Stop Backend Server
stop_service "Backend Server" ".backend.pid"

# Stop Frontend Server
stop_service "Frontend Server" ".frontend.pid"

# Stop Sandbox Portal
stop_service "Sandbox Portal" ".sandbox.pid"

# Additional cleanup - kill any remaining processes on the ports
echo ""
echo -e "${YELLOW}🧹 Cleaning up any remaining processes...${NC}"

# Kill processes on port 8000 (Backend)
if lsof -ti:8000 > /dev/null 2>&1; then
    echo -e "${YELLOW}   Killing process on port 8000...${NC}"
    lsof -ti:8000 | xargs kill -9 2>/dev/null
fi

# Kill processes on port 3000 (Frontend)
if lsof -ti:3000 > /dev/null 2>&1; then
    echo -e "${YELLOW}   Killing process on port 3000...${NC}"
    lsof -ti:3000 | xargs kill -9 2>/dev/null
fi

# Kill processes on port 5001 (Sandbox)
if lsof -ti:5001 > /dev/null 2>&1; then
    echo -e "${YELLOW}   Killing process on port 5001...${NC}"
    lsof -ti:5001 | xargs kill -9 2>/dev/null
fi

echo -e "${GREEN}✅ Cleanup complete${NC}"
echo ""

# Deactivate virtual environment if active
if [ -n "$VIRTUAL_ENV" ]; then
    echo -e "${YELLOW}📦 Deactivating virtual environment...${NC}"
    deactivate 2>/dev/null || true
fi

echo "=========================================================="
echo -e "${GREEN}✅ All services stopped successfully!${NC}"
echo "=========================================================="
echo ""
echo -e "${YELLOW}💡 To start services again, run: ./start.sh${NC}"
echo ""
