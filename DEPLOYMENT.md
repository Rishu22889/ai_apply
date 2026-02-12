# Deployment Guide

This guide covers deploying AI Apply to production environments.

## 🌐 Current Production Deployment

The application is currently deployed and running:

- **Frontend**: [https://agenthire-ten.vercel.app](https://agenthire-ten.vercel.app)
- **Backend API**: [https://agent-hire-backend.onrender.com](https://agent-hire-backend.onrender.com)
- **Sandbox Portal**: [https://agent-hire-sandbox.onrender.com](https://agent-hire-sandbox.onrender.com)

## 🚀 Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend)

This is the recommended and currently used deployment setup.

#### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `frontend` directory as root
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Environment Variables**
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_SANDBOX_URL=https://your-sandbox-url.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main

#### Backend Deployment (Render)

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Name: `ai-apply-backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python run.py`

3. **Environment Variables**
   ```env
   PYTHONPATH=/opt/render/project/src
   DATABASE_URL=sqlite:///data/platform.db
   SANDBOX_URL=https://your-sandbox-url.onrender.com
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically

#### Sandbox Portal Deployment (Render)

1. **Create Another Web Service**
   - Same steps as backend
   - Name: `ai-apply-sandbox`
   - Start Command: `python sandbox/job_portal.py`

2. **Environment Variables**
   ```env
   PYTHONPATH=/opt/render/project/src
   PORT=5001
   ```

### Option 2: Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Initialize**
   ```bash
   railway login
   railway init
   ```

3. **Deploy Backend**
   ```bash
   railway up
   ```

4. **Configure Environment Variables**
   - Go to Railway dashboard
   - Add environment variables
   - Restart service

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create ai-apply-backend
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

4. **Configure Environment Variables**
   ```bash
   heroku config:set DATABASE_URL=sqlite:///data/platform.db
   heroku config:set SANDBOX_URL=https://your-sandbox-url.herokuapp.com
   ```

## 🔧 Production Configuration

### Backend Configuration

**Update CORS origins** in `backend/app.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend-domain.vercel.app",
        "http://localhost:5173",  # Keep for local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Frontend Configuration

**Update API URL** in `frontend/src/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

### Database

For production, consider upgrading from SQLite to PostgreSQL:

1. **Install PostgreSQL adapter**
   ```bash
   pip install psycopg2-binary
   ```

2. **Update DATABASE_URL**
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

3. **Update database.py** to use PostgreSQL connection

## 📊 Monitoring

### Health Checks

- Backend: `https://your-backend-url.onrender.com/`
- Sandbox: `https://your-sandbox-url.onrender.com/api/portal/status`

### Logs

**Render:**
- Go to your service dashboard
- Click "Logs" tab
- View real-time logs

**Vercel:**
- Go to your deployment
- Click "Functions" tab
- View function logs

## 🔒 Security Checklist

- [ ] Change JWT secret key in production
- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable database backups
- [ ] Use environment variables for secrets
- [ ] Set up monitoring and alerts

## 🐛 Troubleshooting

### Backend Not Starting

1. Check logs for errors
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check Python version (3.8+)

### Frontend Not Connecting to Backend

1. Verify VITE_API_URL is correct
2. Check CORS configuration
3. Ensure backend is running
4. Check browser console for errors

### Database Issues

1. Check DATABASE_URL format
2. Verify database file permissions
3. Ensure data directory exists
4. Check disk space

## 📈 Scaling

### Horizontal Scaling

- Use load balancer (Nginx, Cloudflare)
- Deploy multiple backend instances
- Use Redis for session storage

### Database Scaling

- Migrate to PostgreSQL
- Set up read replicas
- Implement connection pooling
- Add database indexes

### Caching

- Implement Redis caching
- Use CDN for static assets
- Enable browser caching
- Cache API responses

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

## 📝 Post-Deployment

1. **Test all features**
   - User registration and login
   - Resume upload and parsing
   - Job browsing and ranking
   - Autopilot execution
   - Application tracking

2. **Monitor performance**
   - Response times
   - Error rates
   - Database queries
   - Memory usage

3. **Set up backups**
   - Database backups
   - Configuration backups
   - Regular snapshots

---

For questions or issues, please open a GitHub issue.
