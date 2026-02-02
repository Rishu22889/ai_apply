# Deploy to Render (Free Tier)

## Step 1: Deploy Backend to Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: https://github.com/Rishu22889/ai_apply.git
4. Configure the service:
   - **Name**: `ai-apply-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python backend/app.py`
   - **Plan**: `Free`

5. Add Environment Variables:
   - `PYTHONPATH` = `/opt/render/project/src`
   - `DATABASE_URL` = `sqlite:///data/platform.db`
   - `PORT` = `8001`

6. Deploy and get your backend URL (e.g., `https://ai-apply-backend.onrender.com`)

## Step 2: Deploy Frontend to Vercel

1. Run: `cd frontend && vercel --prod`
2. Follow the prompts:
   - Link to existing project? `N`
   - Project name: `ai-apply-frontend`
   - Directory: `./` (current directory)
   - Override settings? `Y`
   - Build command: `npm run build`
   - Output directory: `dist`

3. Update environment variables in Vercel dashboard:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com`

## Step 3: Deploy Sandbox Portal

1. Create another Render Web Service for sandbox
2. Same repository, but:
   - **Name**: `ai-apply-sandbox`
   - **Start Command**: `python sandbox/job_portal.py`
   - **Port**: `5001`

Your live URLs will be:
- Frontend: `https://ai-apply-frontend.vercel.app`
- Backend: `https://ai-apply-backend.onrender.com`
- Sandbox: `https://ai-apply-sandbox.onrender.com`