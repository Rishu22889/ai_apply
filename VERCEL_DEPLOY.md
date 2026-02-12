# Vercel Deployment Guide - Frontend

## Overview

The frontend is deployed on Vercel for optimal performance and automatic deployments.

---

## 🚀 Initial Setup

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the repository: `ai-apply`

### 2. Configure Project Settings

**Framework Preset**: Vite

**Root Directory**: `frontend`

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Node.js Version**: 18.x or higher

### 3. Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```env
VITE_API_URL=https://agent-hire-backend.onrender.com
VITE_SANDBOX_URL=https://agent-hire-sandbox.onrender.com
```

**Important**: Make sure to add these for all environments (Production, Preview, Development)

---

## 📋 Deployment Configuration

### vercel.json

The project includes a `vercel.json` file in the root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/frontend/(.*)",
      "dest": "/frontend/$1"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/index.html"
    }
  ],
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite",
  "installCommand": "cd frontend && npm install"
}
```

---

## 🔄 Automatic Deployments

### Production Deployments
- **Trigger**: Push to `main` branch
- **URL**: https://agenthire-ten.vercel.app
- **Automatic**: Yes

### Preview Deployments
- **Trigger**: Push to any branch or Pull Request
- **URL**: Unique URL for each deployment
- **Automatic**: Yes

---

## 🛠️ Manual Deployment

### From Vercel Dashboard

1. Go to your project in Vercel
2. Click "Deployments" tab
3. Click "Redeploy" on the latest deployment
4. Or click "Deploy" → "Deploy from branch"

### From CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
cd frontend
vercel --prod

# Deploy to preview
vercel
```

---

## 🔍 Verification

### Check Deployment Status

1. Go to Vercel Dashboard
2. Click on your project
3. Check "Deployments" tab
4. Latest deployment should show "Ready"

### Test the Application

```bash
# Check if site is accessible
curl -I https://agenthire-ten.vercel.app

# Should return 200 OK
```

Visit in browser: https://agenthire-ten.vercel.app

---

## 🐛 Troubleshooting

### Build Fails

**Error**: "Command failed: npm run build"

**Solutions**:
1. Check build logs in Vercel dashboard
2. Verify `package.json` has correct build script
3. Check for TypeScript errors
4. Verify all dependencies are in `package.json`

**Fix**:
```bash
# Test build locally
cd frontend
npm install
npm run build

# If successful, commit and push
git add .
git commit -m "fix: Update build configuration"
git push origin main
```

### Environment Variables Not Working

**Error**: API calls failing with CORS or 404

**Solutions**:
1. Check environment variables in Vercel dashboard
2. Ensure variables start with `VITE_`
3. Redeploy after adding variables

**Fix**:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add/update variables
3. Click "Redeploy" on latest deployment

### 404 on Page Refresh

**Error**: Refreshing a route shows 404

**Solution**: This is handled by `vercel.json` routing configuration

**Verify**:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/index.html"
    }
  ]
}
```

### CORS Errors

**Error**: "Access-Control-Allow-Origin" error

**Solution**: Backend needs to allow Vercel domain

**Backend Configuration** (backend/app.py):
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://agenthire-ten.vercel.app",
        "https://*.vercel.app"  # Allow all Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📊 Performance Optimization

### Vercel Analytics

Enable in Vercel Dashboard:
1. Go to Project Settings
2. Click "Analytics"
3. Enable Web Analytics
4. View real-time metrics

### Speed Insights

Enable in Vercel Dashboard:
1. Go to Project Settings
2. Click "Speed Insights"
3. Enable feature
4. Monitor Core Web Vitals

---

## 🔐 Security

### Environment Variables

- Never commit `.env` files
- Use Vercel's environment variable system
- Rotate secrets regularly
- Use different values for production/preview

### HTTPS

- Vercel provides automatic HTTPS
- SSL certificates are managed automatically
- All traffic is encrypted

---

## 📈 Monitoring

### Deployment Logs

View in Vercel Dashboard:
1. Click on deployment
2. View "Build Logs"
3. Check for errors or warnings

### Runtime Logs

View in Vercel Dashboard:
1. Click "Logs" tab
2. Filter by time range
3. Search for specific errors

---

## 🔄 Rollback

### Rollback to Previous Deployment

1. Go to Vercel Dashboard
2. Click "Deployments" tab
3. Find the working deployment
4. Click "..." → "Promote to Production"

### Instant Rollback

Vercel keeps all previous deployments:
- No data loss
- Instant rollback
- Can rollback to any previous version

---

## 📝 Best Practices

1. **Use Environment Variables**: Never hardcode API URLs
2. **Test Locally First**: Run `npm run build` before pushing
3. **Check Preview Deployments**: Test changes in preview before merging
4. **Monitor Performance**: Use Vercel Analytics
5. **Keep Dependencies Updated**: Regular `npm update`
6. **Use Git Branches**: Create branches for new features
7. **Review Build Logs**: Check for warnings

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/
- **React Docs**: https://react.dev/

---

## 📞 Support

### Vercel Support
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Status: https://www.vercel-status.com/

### Project Issues
- GitHub Issues: https://github.com/YOUR_USERNAME/ai-apply/issues

---

## ✅ Deployment Checklist

Before deploying:

- [ ] All environment variables set in Vercel
- [ ] Backend CORS configured for Vercel domain
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors in development
- [ ] All routes work correctly
- [ ] API calls work with production backend
- [ ] Responsive design tested
- [ ] Browser compatibility checked

After deploying:

- [ ] Deployment shows "Ready" status
- [ ] Site loads at production URL
- [ ] All pages accessible
- [ ] API calls working
- [ ] Authentication working
- [ ] No console errors
- [ ] Performance is good

---

**Deployment Platform**: Vercel
**Framework**: Vite + React
**Status**: Production Ready
**Last Updated**: February 12, 2026
