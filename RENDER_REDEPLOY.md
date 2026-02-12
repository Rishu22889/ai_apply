# Render Redeployment Guide

## Issue
The sandbox service is trying to run `sandbox_server.py` which doesn't exist. The correct file is `sandbox/job_portal.py`.

## Solution

### Option 1: Redeploy from Render Dashboard (Recommended)

1. **Go to Render Dashboard**: https://dashboard.render.com

2. **For each service (Backend, Frontend, Sandbox)**:
   - Click on the service name
   - Click "Manual Deploy" → "Deploy latest commit"
   - Or click "Settings" → "Redeploy"

3. **Wait for deployment to complete**

### Option 2: Push to GitHub and Auto-Deploy

1. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "fix: Update render.yaml for correct sandbox deployment"
   git push origin main
   ```

2. **Render will automatically detect the changes and redeploy**

### Option 3: Delete and Recreate Sandbox Service

If the above doesn't work:

1. **Go to Render Dashboard**
2. **Delete the sandbox service**:
   - Click on "ai-apply-sandbox"
   - Go to Settings
   - Scroll down and click "Delete Service"

3. **Create new service from render.yaml**:
   - Go to your dashboard
   - Click "New +"
   - Select "Blueprint"
   - Connect your GitHub repository
   - Render will read render.yaml and create all services

## Verification

After deployment, verify each service:

### Backend
```bash
curl https://agent-hire-backend.onrender.com/api/health
```
Expected: `{"status":"healthy"}`

### Frontend (Vercel)
Visit: https://agenthire-ten.vercel.app
Expected: Application loads successfully

### Sandbox
```bash
curl https://agent-hire-sandbox.onrender.com/api/portal/status
```
Expected: JSON with portal statistics

## Current Configuration

### render.yaml (Backend + Sandbox on Render)

```yaml
services:
  - type: web
    name: ai-apply-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python backend/app.py
    envVars:
      - key: PYTHONPATH
        value: /opt/render/project/src
      - key: PORT
        value: 8001
    healthCheckPath: /

  - type: web
    name: ai-apply-sandbox
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python sandbox/job_portal.py
    envVars:
      - key: PYTHONPATH
        value: /opt/render/project/src
      - key: PORT
        value: 5001
      - key: FLASK_APP
        value: sandbox/job_portal.py
    healthCheckPath: /
```

### Frontend Deployment (Vercel)

Frontend is deployed separately on Vercel:
- Repository: Connected to your GitHub repo
- Framework: Vite
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## File Structure (Correct)

```
ai-apply/
├── backend/
│   └── app.py          ✅ Backend entry point
├── frontend/
│   └── (React app)     ✅ Frontend
└── sandbox/
    └── job_portal.py   ✅ Sandbox entry point (NOT sandbox_server.py)
```

## Common Issues

### Issue: "sandbox_server.py not found"
**Cause**: Old deployment configuration cached
**Solution**: Redeploy or delete and recreate service

### Issue: "Module not found"
**Cause**: Missing dependencies
**Solution**: Check requirements.txt includes all needed packages

### Issue: "Port already in use"
**Cause**: Multiple instances running
**Solution**: Render handles this automatically, just redeploy

## Environment Variables

Make sure these are set in Render dashboard for each service:

### Backend
- `PYTHONPATH`: /opt/render/project/src
- `PORT`: 8001
- `DATABASE_URL`: (auto-generated)
- `JWT_SECRET_KEY`: (set in dashboard)

### Frontend
- `NODE_ENV`: production
- `VITE_API_URL`: https://agent-hire-backend.onrender.com

### Sandbox
- `PYTHONPATH`: /opt/render/project/src
- `PORT`: 5001
- `FLASK_APP`: sandbox/job_portal.py

## Troubleshooting

### Check Logs
1. Go to Render Dashboard
2. Click on the service
3. Click "Logs" tab
4. Look for error messages

### Common Log Errors

**Error**: `can't open file 'sandbox_server.py'`
**Fix**: Redeploy with updated render.yaml

**Error**: `ModuleNotFoundError`
**Fix**: Add missing package to requirements.txt

**Error**: `Port 5001 is already in use`
**Fix**: Render will assign a different port automatically

## Quick Commands

### Test Locally
```bash
# Start all services
./start.sh

# Test backend
curl http://localhost:8000/api/health

# Test sandbox
curl http://localhost:5001/api/portal/status

# Stop all services
./stop.sh
```

### Deploy to Render
```bash
# Commit changes
git add .
git commit -m "fix: Update deployment configuration"
git push origin main

# Render will auto-deploy
```

## Support

If issues persist:
1. Check Render status page: https://status.render.com
2. Review Render docs: https://render.com/docs
3. Check service logs in Render dashboard
4. Try manual redeploy
5. Delete and recreate service as last resort

## Success Indicators

✅ Backend: Returns health check response
✅ Frontend: Loads in browser
✅ Sandbox: Returns portal status with job count
✅ All services show "Live" status in Render dashboard
✅ No error logs in Render dashboard

---

**Last Updated**: February 12, 2026
**Status**: Ready for redeployment
