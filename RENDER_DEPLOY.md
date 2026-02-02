# Quick Deploy to Render

## Backend Deployment

1. **Go to Render**: https://render.com
2. **Sign up/Login** with your GitHub account
3. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect repository: `https://github.com/Rishu22889/ai_apply.git`
   - Name: `ai-apply-backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python server.py`
   - Plan: **Free**

4. **Environment Variables** (Add in Render dashboard):
   ```
   PYTHONPATH=/opt/render/project/src
   DATABASE_URL=sqlite:///data/platform.db
   PORT=10000
   ```

5. **Deploy** - Render will build and deploy automatically

## Sandbox Portal Deployment

1. **Create another Web Service**:
   - Same repository
   - Name: `ai-apply-sandbox`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python sandbox/job_portal.py`
   - Plan: **Free**

## Frontend Configuration

Your frontend is already deployed at: **https://agenthire-ten.vercel.app**

After backend deployment, update frontend environment variables in Vercel:
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_SANDBOX_URL=https://your-sandbox-url.onrender.com
   ```

## Expected URLs

- **Frontend**: https://agenthire-ten.vercel.app ✅ (Already deployed)
- **Backend**: https://ai-apply-backend.onrender.com (Deploy this)
- **Sandbox**: https://ai-apply-sandbox.onrender.com (Deploy this)

## Test Your Deployment

1. Visit your frontend URL
2. Register/Login with: rishi@gmail.com / rishii
3. Upload resume and create profile
4. Test job applications through the sandbox portal