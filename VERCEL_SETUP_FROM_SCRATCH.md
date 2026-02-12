# Vercel Setup From Scratch - Complete Guide

## 🚀 Fresh Vercel Deployment

Follow these steps to deploy your frontend on Vercel from scratch.

---

## Step 1: Prepare Your Project

### 1.1 Verify Frontend Works Locally

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Test build
npm run build

# Test preview
npm run preview
```

If this works, you're ready to deploy!

### 1.2 Check Environment Variables

Make sure `frontend/.env.example` exists:

```env
VITE_API_URL=http://localhost:8000
VITE_SANDBOX_URL=http://localhost:5001
```

---

## Step 2: Push to GitHub

```bash
# From project root
git add .
git commit -m "feat: Ready for Vercel deployment"
git push origin main
```

---

## Step 3: Create Vercel Account & Project

### 3.1 Sign Up / Login

1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### 3.2 Import Project

1. Click "Add New..." → "Project"
2. Find your repository: `ai-apply`
3. Click "Import"

---

## Step 4: Configure Project Settings

### 4.1 Framework Preset

- **Framework Preset**: Vite
- Vercel should auto-detect this

### 4.2 Root Directory

⚠️ **IMPORTANT**: Set root directory to `frontend`

1. Click "Edit" next to Root Directory
2. Type: `frontend`
3. Click "Continue"

### 4.3 Build Settings

Vercel should auto-detect these, but verify:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4.4 Node.js Version

- **Node.js Version**: 18.x (default is fine)

---

## Step 5: Environment Variables

⚠️ **CRITICAL**: Add these environment variables

1. Click "Environment Variables" section
2. Add the following:

**Variable 1:**
- Name: `VITE_API_URL`
- Value: `https://agent-hire-backend.onrender.com`
- Environment: Production, Preview, Development (select all)

**Variable 2:**
- Name: `VITE_SANDBOX_URL`
- Value: `https://agent-hire-sandbox.onrender.com`
- Environment: Production, Preview, Development (select all)

---

## Step 6: Deploy

1. Click "Deploy"
2. Wait for deployment (1-3 minutes)
3. You'll see build logs in real-time

### Expected Build Output:

```
Installing dependencies...
✓ Dependencies installed

Building application...
✓ Build completed

Uploading build...
✓ Upload complete

Deployment ready!
```

---

## Step 7: Verify Deployment

### 7.1 Check Deployment Status

You should see:
- ✅ Status: Ready
- 🌐 URL: https://your-project-name.vercel.app

### 7.2 Test the Application

1. Click on the deployment URL
2. Verify:
   - ✅ Page loads
   - ✅ No console errors (F12 → Console)
   - ✅ Can navigate to different pages
   - ✅ Login/Register pages work
   - ✅ About and Contact pages load

### 7.3 Test API Connection

1. Try to register a new account
2. If you get CORS errors, see troubleshooting below

---

## Step 8: Configure Custom Domain (Optional)

### 8.1 Add Domain

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain
4. Follow DNS configuration instructions

### 8.2 Update Environment Variables

If using custom domain, update backend CORS:

```python
# backend/app.py
allow_origins=[
    "https://your-custom-domain.com",
    "https://*.vercel.app"
]
```

---

## 🐛 Troubleshooting

### Issue 1: Build Fails

**Error**: "Command 'npm run build' failed"

**Solution**:
```bash
# Test locally first
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build

# If successful, commit and push
git add .
git commit -m "fix: Update dependencies"
git push origin main
```

### Issue 2: 404 on Routes

**Error**: Refreshing page shows 404

**Solution**: Add `vercel.json` in project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

But wait! We need to configure it for the frontend subdirectory.

### Issue 3: Root Directory Not Working

**Error**: Build can't find package.json

**Solution**: Use this `vercel.json` in project root:

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite",
  "installCommand": "cd frontend && npm install"
}
```

### Issue 4: Environment Variables Not Working

**Error**: API calls fail or go to localhost

**Solution**:
1. Go to Project Settings → Environment Variables
2. Verify variables exist and start with `VITE_`
3. Click "Redeploy" after adding variables

### Issue 5: CORS Errors

**Error**: "Access-Control-Allow-Origin" error

**Solution**: Update backend CORS configuration:

```python
# backend/app.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://*.vercel.app",  # Allow all Vercel deployments
        "https://your-project-name.vercel.app"  # Your specific URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Then redeploy backend on Render.

---

## 📝 Correct Configuration Files

### vercel.json (Project Root)

Create or update `vercel.json`:

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite",
  "installCommand": "cd frontend && npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### frontend/vite.config.js

Verify this exists and looks like:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: true
  }
})
```

### frontend/.env.example

```env
VITE_API_URL=http://localhost:8000
VITE_SANDBOX_URL=http://localhost:5001
```

---

## 🔄 Redeploy After Configuration Changes

### Method 1: From Dashboard

1. Go to Vercel Dashboard
2. Click on your project
3. Click "Deployments" tab
4. Click "..." on latest deployment
5. Click "Redeploy"

### Method 2: Push to GitHub

```bash
git add .
git commit -m "fix: Update Vercel configuration"
git push origin main
```

Vercel will automatically redeploy.

---

## ✅ Final Verification Checklist

After deployment, verify:

- [ ] Deployment status shows "Ready"
- [ ] No build errors in logs
- [ ] Site loads at Vercel URL
- [ ] All pages accessible (/, /login, /register, /about, /contact)
- [ ] No console errors (F12 → Console)
- [ ] Images and assets load
- [ ] Navigation works
- [ ] Can register new account
- [ ] Can login
- [ ] API calls work (check Network tab)
- [ ] Responsive design works on mobile

---

## 🎯 Quick Start Commands

```bash
# 1. Ensure frontend works locally
cd frontend
npm install
npm run build
npm run preview

# 2. Commit and push
cd ..
git add .
git commit -m "feat: Deploy to Vercel"
git push origin main

# 3. Go to Vercel
# - Import project
# - Set root directory: frontend
# - Add environment variables
# - Deploy

# 4. Verify
# Visit your Vercel URL and test
```

---

## 📞 Need Help?

### Vercel Support
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Status: https://www.vercel-status.com

### Common Issues
- Build fails → Check build logs
- 404 errors → Check vercel.json rewrites
- CORS errors → Update backend CORS
- Env vars not working → Redeploy after adding

---

## 🎉 Success!

Once deployed, you should have:
- ✅ Live frontend at Vercel URL
- ✅ Automatic deployments on push
- ✅ Preview deployments for PRs
- ✅ HTTPS enabled automatically
- ✅ CDN distribution worldwide

---

**Next Steps After Successful Deployment:**

1. Update README with new Vercel URL
2. Test all features end-to-end
3. Share your live application
4. Monitor deployment logs
5. Set up custom domain (optional)

---

**Created**: February 12, 2026
**Status**: Ready for Fresh Deployment
