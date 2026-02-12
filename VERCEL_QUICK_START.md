# Vercel Quick Start - Deploy in 5 Minutes

## ✅ Pre-Deployment Check Complete

Your frontend build works! Now deploy to Vercel.

---

## 🚀 Deploy to Vercel (5 Steps)

### Step 1: Push to GitHub (1 minute)

```bash
git add .
git commit -m "feat: Deploy frontend to Vercel"
git push origin main
```

### Step 2: Go to Vercel (30 seconds)

1. Visit: https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"

### Step 3: Import Project (1 minute)

1. Click "Add New..." → "Project"
2. Find repository: `ai-apply`
3. Click "Import"

### Step 4: Configure (2 minutes)

**Root Directory**: 
- Click "Edit" next to Root Directory
- Type: `frontend`
- Click "Continue"

**Environment Variables**:
Click "Environment Variables" and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://agent-hire-backend.onrender.com` |
| `VITE_SANDBOX_URL` | `https://agent-hire-sandbox.onrender.com` |

Select: Production, Preview, Development (all three)

**Build Settings** (auto-detected):
- Framework: Vite ✅
- Build Command: `npm run build` ✅
- Output Directory: `dist` ✅

### Step 5: Deploy! (1 minute)

1. Click "Deploy"
2. Wait for build (1-2 minutes)
3. Done! 🎉

---

## ✅ Verification

After deployment:

1. Click on the deployment URL
2. Test these pages:
   - ✅ Home/Login page loads
   - ✅ Register page works
   - ✅ About page loads
   - ✅ Contact page loads
3. Open browser console (F12)
   - ✅ No errors

---

## 🐛 If Something Goes Wrong

### Build Fails?

**Check build logs** in Vercel dashboard for errors.

**Common fix**:
```bash
# Test locally first
cd frontend
npm install
npm run build

# If it works, push again
git add .
git commit -m "fix: Update build"
git push origin main
```

### 404 on Routes?

Already fixed! `vercel.json` handles this.

### CORS Errors?

Update backend CORS to include your Vercel URL:

```python
# backend/app.py
allow_origins=[
    "https://your-project.vercel.app",
    "https://*.vercel.app"
]
```

Then redeploy backend on Render.

---

## 📝 Configuration Files (Already Set Up)

### ✅ vercel.json
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

### ✅ frontend/vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  build: { outDir: 'dist' },
  preview: { port: 3000, host: true }
})
```

### ✅ frontend/.env.example
```env
VITE_API_URL=http://localhost:8001
VITE_SANDBOX_URL=http://localhost:5001
```

---

## 🎯 What You'll Get

After successful deployment:

- ✅ Live URL: `https://your-project.vercel.app`
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-deploy on push to main
- ✅ Preview deployments for PRs
- ✅ Zero configuration needed

---

## 📞 Need Help?

Run the helper script:
```bash
./deploy_vercel.sh
```

Or check the detailed guide:
```bash
cat VERCEL_SETUP_FROM_SCRATCH.md
```

---

## 🎉 That's It!

Your frontend will be live in ~5 minutes!

**Next**: After deployment, update your README with the new Vercel URL.

---

**Quick Links**:
- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Your Backend: https://agent-hire-backend.onrender.com
- Your Sandbox: https://agent-hire-sandbox.onrender.com
