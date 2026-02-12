#!/bin/bash

# Vercel Deployment Helper Script

echo "🚀 Vercel Deployment Helper"
echo "============================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Step 1: Test frontend build locally
echo -e "${BLUE}Step 1: Testing frontend build locally...${NC}"
cd frontend

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

echo -e "${BLUE}Running build...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed! Fix errors before deploying.${NC}"
    exit 1
fi

cd ..
echo ""

# Step 2: Check vercel.json
echo -e "${BLUE}Step 2: Checking vercel.json...${NC}"
if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✅ vercel.json exists${NC}"
    echo "Content:"
    cat vercel.json
else
    echo -e "${RED}❌ vercel.json not found!${NC}"
    exit 1
fi
echo ""

# Step 3: Check environment files
echo -e "${BLUE}Step 3: Checking environment files...${NC}"
if [ -f "frontend/.env.example" ]; then
    echo -e "${GREEN}✅ frontend/.env.example exists${NC}"
    echo "Remember to set these in Vercel:"
    cat frontend/.env.example
else
    echo -e "${YELLOW}⚠️  frontend/.env.example not found${NC}"
fi
echo ""

# Step 4: Git status
echo -e "${BLUE}Step 4: Checking git status...${NC}"
if git diff --quiet && git diff --cached --quiet; then
    echo -e "${GREEN}✅ No uncommitted changes${NC}"
else
    echo -e "${YELLOW}⚠️  You have uncommitted changes${NC}"
    echo ""
    echo "Commit them with:"
    echo "  git add ."
    echo "  git commit -m 'feat: Ready for Vercel deployment'"
    echo "  git push origin main"
fi
echo ""

# Step 5: Instructions
echo "============================"
echo -e "${GREEN}✅ Pre-deployment checks complete!${NC}"
echo "============================"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo "1. Commit and push your changes (if any):"
echo "   ${YELLOW}git add .${NC}"
echo "   ${YELLOW}git commit -m 'feat: Deploy to Vercel'${NC}"
echo "   ${YELLOW}git push origin main${NC}"
echo ""
echo "2. Go to Vercel:"
echo "   ${YELLOW}https://vercel.com${NC}"
echo ""
echo "3. Import your project:"
echo "   • Click 'Add New' → 'Project'"
echo "   • Select your GitHub repository"
echo "   • Click 'Import'"
echo ""
echo "4. Configure settings:"
echo "   • Framework: Vite"
echo "   • Root Directory: ${YELLOW}frontend${NC}"
echo "   • Build Command: npm run build"
echo "   • Output Directory: dist"
echo ""
echo "5. Add Environment Variables:"
echo "   • ${YELLOW}VITE_API_URL${NC} = https://agent-hire-backend.onrender.com"
echo "   • ${YELLOW}VITE_SANDBOX_URL${NC} = https://agent-hire-sandbox.onrender.com"
echo ""
echo "6. Click 'Deploy' and wait!"
echo ""
echo "============================"
echo -e "${GREEN}Good luck! 🎉${NC}"
echo "============================"
