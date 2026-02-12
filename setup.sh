#!/bin/bash

# AI Apply - Setup Script
# This script sets up the development environment for AI Apply

set -e  # Exit on error

echo "🚀 Setting up AI Apply..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Python version
echo -e "${BLUE}Checking Python version...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}Python 3 is not installed. Please install Python 3.8 or higher.${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo -e "${GREEN}✓ Python $PYTHON_VERSION found${NC}"
echo ""

# Check Node.js version
echo -e "${BLUE}Checking Node.js version...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js is not installed. Please install Node.js 16 or higher.${NC}"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✓ Node.js $NODE_VERSION found${NC}"
echo ""

# Create virtual environment
echo -e "${BLUE}Creating Python virtual environment...${NC}"
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo -e "${GREEN}✓ Virtual environment created${NC}"
else
    echo -e "${YELLOW}Virtual environment already exists${NC}"
fi
echo ""

# Activate virtual environment
echo -e "${BLUE}Activating virtual environment...${NC}"
source venv/bin/activate
echo -e "${GREEN}✓ Virtual environment activated${NC}"
echo ""

# Install Python dependencies
echo -e "${BLUE}Installing Python dependencies...${NC}"
pip install --upgrade pip
pip install -r requirements.txt
echo -e "${GREEN}✓ Python dependencies installed${NC}"
echo ""

# Install frontend dependencies
echo -e "${BLUE}Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""

# Create data directory
echo -e "${BLUE}Creating data directory...${NC}"
mkdir -p data
echo -e "${GREEN}✓ Data directory created${NC}"
echo ""

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo -e "${BLUE}Creating .env file...${NC}"
    cat > .env << EOF
DATABASE_URL=sqlite:///./data/platform.db
JWT_SECRET_KEY=dev-secret-key-change-in-production
SANDBOX_URL=http://localhost:5001
EOF
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${YELLOW}.env file already exists${NC}"
fi
echo ""

# Create frontend .env file if it doesn't exist
if [ ! -f "frontend/.env" ]; then
    echo -e "${BLUE}Creating frontend .env file...${NC}"
    cat > frontend/.env << EOF
VITE_API_URL=http://localhost:8000
VITE_SANDBOX_URL=http://localhost:5001
EOF
    echo -e "${GREEN}✓ Frontend .env file created${NC}"
else
    echo -e "${YELLOW}Frontend .env file already exists${NC}"
fi
echo ""

# Success message
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Setup completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}To start the application:${NC}"
echo ""
echo -e "  ${YELLOW}Terminal 1 - Backend:${NC}"
echo -e "    source venv/bin/activate"
echo -e "    python run.py"
echo ""
echo -e "  ${YELLOW}Terminal 2 - Frontend:${NC}"
echo -e "    cd frontend"
echo -e "    npm run dev"
echo ""
echo -e "  ${YELLOW}Terminal 3 - Sandbox Portal (Optional):${NC}"
echo -e "    source venv/bin/activate"
echo -e "    python sandbox/job_portal.py"
echo ""
echo -e "${BLUE}Access the application at:${NC}"
echo -e "  Frontend: ${GREEN}http://localhost:5173${NC}"
echo -e "  Backend:  ${GREEN}http://localhost:8000${NC}"
echo -e "  Sandbox:  ${GREEN}http://localhost:5001${NC}"
echo ""
echo -e "${BLUE}For more information, see:${NC}"
echo -e "  README.md - User guide"
echo -e "  DEVELOPMENT.md - Developer guide"
echo ""
