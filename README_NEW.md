# AI Apply - Intelligent Job Application System

A modern, full-stack web application that uses AI to automatically find, analyze, and apply to jobs based on your profile and preferences.

## 🚀 Features

### ✨ Core Functionality
- **AI-Powered Job Matching**: Intelligent job analysis and ranking based on your profile
- **Automated Applications**: AI applies to suitable jobs automatically with daily limits
- **Profile Management**: Comprehensive profile system with constraints and preferences
- **Resume Processing**: Upload and extract text from PDF, Word, and text files
- **Application Tracking**: Complete history and status tracking of all applications
- **Real-time Dashboard**: Monitor AI runs, application statistics, and job matches

### 🎨 Modern UI/UX
- **Beautiful Design**: Modern gradient-based design with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Interactive Components**: Hover effects, transitions, and micro-interactions
- **Dark/Light Themes**: Gradient backgrounds with excellent contrast
- **Accessibility**: Proper color contrast and keyboard navigation

### 🤖 AI Features
- **Smart Job Analysis**: AI evaluates job compatibility with your profile
- **Daily Limit Enforcement**: Respects max applications per day constraints
- **Match Scoring**: Provides detailed match scores and reasoning
- **Automated Decision Making**: Decides which jobs to apply to automatically
- **Learning System**: Improves recommendations based on your preferences

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with modern hooks
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router for SPA navigation
- **State Management**: Context API for authentication
- **Build Tool**: Vite for fast development and building

### Backend (Python + FastAPI)
- **Framework**: FastAPI for high-performance API
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: JWT-based secure authentication
- **AI Integration**: Custom AI agents for job matching
- **File Processing**: PDF/Word resume parsing

### Sandbox Portal (Flask)
- **Testing Environment**: Realistic job portal simulation
- **Application Management**: Submit and manage test applications
- **Job Listings**: 100+ realistic job postings
- **Delete Functionality**: Remove applications for testing

## 🚀 Quick Start

### Option 1: Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/Rishu22889/ai_apply.git
cd ai_apply

# Run the deployment script
./deploy.sh
```

### Option 2: Manual Setup

#### Prerequisites
- **Python 3.11+**
- **Node.js 18+**
- **npm or yarn**

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rishu22889/ai_apply.git
   cd ai_apply
   ```

2. **Set up Python backend**
   ```bash
   # Create virtual environment
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Set up React frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

#### Running the Application

1. **Start the backend server**
   ```bash
   # Activate virtual environment
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   
   # Run the backend
   python backend/app.py
   ```
   Backend will be available at `http://localhost:8001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000`

3. **Start the sandbox job portal**
   ```bash
   python sandbox/job_portal.py
   ```
   Sandbox portal will be available at `http://localhost:5001`

## 📖 Usage Guide

### 1. **Account Setup**
- Register a new account or login with: `rishi@gmail.com` / `rishii`
- Complete your profile with skills, education, and experience
- Set your job preferences and daily application limits

### 2. **Resume Upload**
- Upload your resume (PDF, Word, or text format)
- AI will extract and analyze the content
- Review and edit the generated profile

### 3. **Job Matching**
- AI automatically finds and analyzes available jobs from the sandbox portal
- View match scores and AI reasoning for each job
- Browse job listings with detailed compatibility analysis

### 4. **Automated Applications**
- Set your application constraints (max 5 per day by default)
- Run the AI autopilot to apply to suitable jobs automatically
- System enforces daily limits and keeps remaining jobs for next day
- Monitor progress in real-time

### 5. **Dashboard & Tracking**
- View application history and statistics
- Track AI run results and success rates
- Delete test applications from sandbox portal
- Manage your profile and preferences

## 🚀 Deployment

### Quick Deploy with Docker
```bash
# Clone and deploy
git clone https://github.com/Rishu22889/ai_apply.git
cd ai_apply
./deploy.sh
```

### Cloud Deployment Options

#### 1. Railway (Backend + Database)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy backend
railway login
railway init
railway up
```

#### 2. Vercel (Frontend)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

#### 3. Full Docker Deployment
```bash
# Build and run all services
docker-compose up -d

# Access URLs:
# Frontend: http://localhost
# Backend: http://localhost:8001
# Sandbox: http://localhost:5001
```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🔧 Key Improvements

### Daily Limit Enforcement
- ✅ Properly enforces `max_apps_per_day` limit
- ✅ Stops at exact limit (e.g., 5 applications)
- ✅ Remaining jobs stay as `will_apply` for next day
- ✅ No more excessive "queued" entries

### Application Management
- ✅ Delete individual applications from sandbox portal
- ✅ Bulk delete all applications endpoint
- ✅ Web interface for application management
- ✅ API endpoints for programmatic access

### Enhanced AI Ranking
- ✅ Differentiates daily limit vs permanent skips
- ✅ Better application history tracking
- ✅ Improved skip reason categorization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React, FastAPI, Docker, and AI**