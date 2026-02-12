# Render Deployment Guide

Quick guide for deploying AI Apply to Render.com

## 🚀 Quick Deploy

### Backend Deployment

1. **Create Account**
   - Go to [render.com](https://render.com)
   - Sign up or log in

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   - **Name**: `ai-apply-backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python run.py`
   - **Instance Type**: Free (or paid for better performance)

4. **Environment Variables**
   Add these in the "Environment" section:
   ```
   PYTHONPATH=/opt/render/project/src
   DATABASE_URL=sqlite:///data/platform.db
   SANDBOX_URL=https://your-sandbox-url.onrender.com
   JWT_SECRET_KEY=your-secure-secret-key-here
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://your-app.onrender.com`

### Sandbox Portal Deployment

1. **Create Another Web Service**
   - Same steps as backend
   - **Name**: `ai-apply-sandbox`
   - **Start Command**: `python sandbox/job_portal.py`

2. **Environment Variables**
   ```
   PYTHONPATH=/opt/render/project/src
   PORT=5001
   ```

3. **Deploy**
   - Click "Create Web Service"
   - Note your sandbox URL

### Frontend Deployment (Vercel)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Configure**
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   VITE_SANDBOX_URL=https://your-sandbox.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

## 🔧 Update Backend CORS

After deployment, update CORS in `backend/app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-app.vercel.app",  # Add your Vercel URL
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit and push to trigger redeployment.

## ✅ Verify Deployment

1. **Backend Health Check**
   - Visit: `https://your-backend.onrender.com/`
   - Should return: `{"message": "Persistent Job Application Platform API", ...}`

2. **Sandbox Status**
   - Visit: `https://your-sandbox.onrender.com/api/portal/status`
   - Should return portal status

3. **Frontend**
   - Visit: `https://your-app.vercel.app`
   - Register and test the application

## 🐛 Troubleshooting

### Backend Not Starting

**Check logs in Render dashboard:**
- Go to your service
- Click "Logs" tab
- Look for errors

**Common issues:**
- Missing environment variables
- Python version mismatch
- Dependency installation failed

### Frontend Can't Connect

**Check:**
- VITE_API_URL is correct
- Backend CORS includes frontend URL
- Backend is running (check health endpoint)

### Database Issues

**Note:** Render's free tier may reset the database periodically.

**For persistent storage:**
- Upgrade to paid tier
- Or use external database (PostgreSQL)

## 📊 Monitoring

### Render Dashboard

- View logs in real-time
- Monitor resource usage
- Check deployment status

### Set Up Alerts

1. Go to service settings
2. Add notification webhooks
3. Configure alert thresholds

## 🔄 Continuous Deployment

Render automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render will:
1. Detect the push
2. Build the application
3. Deploy automatically
4. Show status in dashboard

## 💰 Cost Optimization

### Free Tier Limits

- Backend: Spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours/month free

### Upgrade Options

- **Starter**: $7/month - Always on, faster
- **Standard**: $25/month - More resources
- **Pro**: $85/month - High performance

## 🔒 Security

### Production Checklist

- [ ] Change JWT_SECRET_KEY to secure random string
- [ ] Enable HTTPS only
- [ ] Configure proper CORS origins
- [ ] Set up rate limiting
- [ ] Enable database backups (paid tier)
- [ ] Monitor logs for suspicious activity

### Generate Secure Secret

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Use this as your JWT_SECRET_KEY.

## 📈 Scaling

### Horizontal Scaling

- Add more instances in Render dashboard
- Use load balancer
- Consider Redis for session storage

### Database Scaling

- Migrate to PostgreSQL
- Use Render's managed PostgreSQL
- Set up read replicas

## 🆘 Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)
- [GitHub Issues](https://github.com/Rishu22889/ai-apply/issues)

---

**Deployment complete!** 🎉

Your AI Apply application is now live and ready to use.
