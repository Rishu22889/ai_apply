# AI Apply - Deployment Guide

This guide covers multiple deployment options for the AI Apply job application system.

## 🏗️ Architecture Overview

The system consists of three main components:
- **Backend**: FastAPI application (Python) - Port 8001
- **Frontend**: React/Vite application - Port 80/3000
- **Sandbox Portal**: Flask application for testing - Port 5001

## 🐳 Docker Deployment (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- At least 2GB RAM available

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Rishu22889/ai_apply.git
cd ai_apply

# Build and run all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Access URLs
- Frontend: http://localhost
- Backend API: http://localhost:8001
- Sandbox Portal: http://localhost:5001

### Production Docker Setup
```bash
# For production, modify docker-compose.yml to:
# 1. Use environment variables for secrets
# 2. Enable PostgreSQL instead of SQLite
# 3. Add SSL certificates
# 4. Configure proper logging

# Stop services
docker-compose down

# Remove volumes (careful - this deletes data!)
docker-compose down -v
```

## ☁️ Cloud Platform Deployments

### 1. Railway (Backend + Database)

Railway is perfect for the backend and database:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

**Configuration:**
- Uses `railway.json` configuration
- Automatically detects Python app
- Provides PostgreSQL database
- Custom domain support

### 2. Vercel (Frontend)

Vercel is ideal for the React frontend:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

**Configuration:**
- Uses `vercel.json` configuration
- Automatic builds from Git
- CDN distribution
- Custom domain support

### 3. Render (Full Stack)

Render can host all components:

```bash
# Connect your GitHub repo to Render
# Uses render.yaml for configuration
# Supports both static sites and web services
```

### 4. Heroku (Backend)

```bash
# Install Heroku CLI
# Login and create app
heroku login
heroku create ai-apply-backend

# Deploy
git push heroku main
```

## 🔧 Environment Configuration

### Backend Environment Variables
```bash
# Required
PYTHONPATH=/app
DATABASE_URL=sqlite:///data/platform.db  # or PostgreSQL URL
PORT=8001

# Optional
DEBUG=false
LOG_LEVEL=INFO
CORS_ORIGINS=https://your-frontend-domain.com
```

### Frontend Environment Variables
```bash
# Required
VITE_API_URL=https://your-backend-url.com
VITE_SANDBOX_URL=https://your-sandbox-url.com

# Optional
VITE_APP_NAME="AI Apply"
```

## 🗄️ Database Setup

### SQLite (Development)
- Default configuration
- File-based database in `data/platform.db`
- No additional setup required

### PostgreSQL (Production)
```bash
# Update backend/database.py to use PostgreSQL
# Install psycopg2: pip install psycopg2-binary
# Set DATABASE_URL environment variable

DATABASE_URL=postgresql://user:password@host:port/database
```

## 🚀 Deployment Strategies

### Strategy 1: Microservices (Recommended)
- **Frontend**: Vercel/Netlify
- **Backend**: Railway/Render
- **Sandbox**: Railway/Render (separate service)
- **Database**: Railway PostgreSQL/AWS RDS

### Strategy 2: Single Platform
- **All services**: Render/Railway
- Use docker-compose.yml
- Single domain with subpaths

### Strategy 3: Self-Hosted
- **Server**: VPS/Dedicated server
- **Reverse Proxy**: Nginx
- **Process Manager**: PM2/Systemd
- **Database**: PostgreSQL

## 🔒 Security Considerations

### Production Checklist
- [ ] Use HTTPS everywhere
- [ ] Set secure CORS origins
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up proper logging
- [ ] Use PostgreSQL instead of SQLite
- [ ] Enable authentication tokens
- [ ] Set up monitoring and alerts

### Environment Variables Security
```bash
# Never commit these to Git
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
JWT_SECRET=your-jwt-secret
OPENAI_API_KEY=your-openai-key  # if using AI features
```

## 📊 Monitoring and Logging

### Health Checks
- Backend: `GET /` - Returns API status
- Frontend: `GET /` - Returns React app
- Sandbox: `GET /api/portal/status` - Returns portal status

### Logging
```bash
# View Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f sandbox

# Production logging
# Configure structured logging with timestamps
# Use log aggregation services (LogDNA, Papertrail)
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: railway up --service backend
      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Update CORS_ORIGINS in backend
   - Check frontend API URL configuration

2. **Database Connection**
   - Verify DATABASE_URL format
   - Check database server status
   - Ensure network connectivity

3. **Build Failures**
   - Check Node.js/Python versions
   - Verify all dependencies in requirements.txt/package.json
   - Check build logs for specific errors

4. **Port Conflicts**
   - Ensure ports 80, 8001, 5001 are available
   - Modify docker-compose.yml if needed

### Debug Commands
```bash
# Check service status
docker-compose ps

# View real-time logs
docker-compose logs -f

# Access container shell
docker-compose exec backend bash
docker-compose exec frontend sh

# Test API endpoints
curl http://localhost:8001/
curl http://localhost:8001/api/portal/status
```

## 📈 Scaling Considerations

### Horizontal Scaling
- Use load balancers for multiple backend instances
- Implement session storage (Redis)
- Use CDN for static assets

### Database Scaling
- Read replicas for PostgreSQL
- Connection pooling
- Database indexing optimization

### Caching
- Redis for session storage
- CDN for static assets
- API response caching

## 🎯 Next Steps

1. Choose your deployment strategy
2. Set up monitoring and logging
3. Configure custom domains
4. Set up SSL certificates
5. Implement backup strategies
6. Set up CI/CD pipeline

For specific platform instructions, refer to their documentation:
- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Docker Docs](https://docs.docker.com/)