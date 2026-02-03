# AI Apply - Intelligent Job Application System

A modern, full-stack web application that uses AI to automatically find, analyze, and apply to jobs based on your profile and preferences.

## 🌐 Live Demo

**Try the live application:**

- **🎯 Main Application**: https://agenthire-ten.vercel.app
- **🔧 Backend API**: https://agent-hire-backend.onrender.com
- **📋 Sandbox Job Portal**: https://agent-hire-sandbox.onrender.com

**Demo Credentials:**
- Email: `rishi@gmail.com`
- Password: `rishii`

> **Note**: The sandbox portal contains 220+ realistic job listings from major Indian companies (TCS, Infosys, Wipro, HCL, Flipkart, etc.) and international companies (Google, Microsoft, Amazon) for comprehensive testing.

### ✅ Latest Updates (February 2026)
- **🔧 Fixed**: Unknown applications issue - all applications now show proper company/role information
- **🧪 Added**: Comprehensive test suite with 5 tests covering core functionality  
- **📊 Enhanced**: Application tracking with improved data integrity and error handling
- **🚀 Verified**: All deployment dependencies and CI/CD pipeline working correctly
- **✨ Improved**: Daily application limits properly enforced with better user feedback

## 🚀 Features

### ✨ Core Functionality
- **AI-Powered Job Matching**: Intelligent job analysis and ranking based on your profile
- **Automated Applications**: AI applies to suitable jobs automatically
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
- **Constraint Respect**: Honors your location, salary, and company preferences
- **Match Scoring**: Provides detailed match scores and reasoning
- **Automated Decision Making**: Decides which jobs to apply to automatically
- **Learning System**: Improves recommendations based on your preferences

## 🏗️ Architecture & Deployment

### 🌐 Production Deployment
- **Frontend**: Deployed on Vercel with automatic builds from GitHub
- **Backend**: Deployed on Render with auto-scaling and health checks  
- **Sandbox Portal**: Deployed on Render for realistic job application testing
- **Database**: SQLite with persistent storage on Render
- **CDN**: Static assets served via Vercel's global CDN

### 🔧 Technology Stack

### Frontend (React + Vite)
- **Framework**: React 18 with modern hooks
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router for SPA navigation
- **State Management**: Context API for authentication
- **Build Tool**: Vite for fast development and building

### Backend (Python + FastAPI)
- **Framework**: FastAPI for high-performance API
- **Database**: SQLite with SQLAlchemy ORM
- **Authentication**: JWT-based secure authentication
- **AI Integration**: Custom AI agents for job matching
- **File Processing**: PDF/Word resume parsing

### Key Components
- **AI Agents**: Job analysis and application automation
- **Profile System**: Comprehensive user profile management
- **Job Portal Integration**: Sandbox job portal for testing
- **Application Engine**: Automated job application system

## 📁 Project Structure

```
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── api.js          # API client
│   │   └── index.css       # Global styles and design system
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── backend/                 # Python FastAPI backend
│   ├── app.py             # Main FastAPI application
│   ├── auth.py            # Authentication system
│   ├── database.py        # Database models and connection
│   ├── ai_agents.py       # AI job matching agents
│   └── models.py          # Data models
├── core/                   # Core business logic
│   ├── generator.py       # Profile generation
│   ├── scorer.py          # Job scoring algorithms
│   ├── tracker.py         # Application tracking
│   └── validator.py       # Data validation
├── schemas/               # Data schemas and validation
├── sandbox/               # Sandbox job portal for testing
├── requirements.txt       # Python dependencies
├── package.json          # Node.js dependencies (root)
└── README.md             # This file
```

## 🚀 Quick Start

### 🌐 Try the Live Demo (Recommended)
1. **Visit**: https://agenthire-ten.vercel.app
2. **Register** or use demo credentials: `demo@example.com` / `demo123`
3. **Upload** your resume and create your profile
4. **Explore** 220+ job listings with AI-powered matching
5. **Run** autopilot to see automated job applications in action

### 🛠️ Local Development Setup

### Prerequisites
- **Python 3.8+**
- **Node.js 16+**
- **npm or yarn**

### Installation

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

4. **Install root dependencies** (for development tools)
   ```bash
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   # Activate virtual environment
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   
   # Run the backend
   python run.py
   ```
   Backend will be available at `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

3. **Start the sandbox job portal** (optional, for testing)
   ```bash
   python sandbox/job_portal.py
   ```
   Sandbox portal will be available at `http://localhost:5001`

## 📖 Usage Guide

### 1. **Account Setup**
- Register a new account or login
- Complete your profile with skills, education, and experience
- Set your job preferences and constraints

### 2. **Resume Upload**
- Upload your resume (PDF, Word, or text format)
- AI will extract and analyze the content
- Review and edit the generated profile

### 3. **Job Matching**
- AI automatically finds and analyzes available jobs
- View match scores and AI reasoning for each job
- Browse job listings with detailed compatibility analysis

### 4. **Automated Applications**
- Set your application constraints (location, salary, etc.)
- Run the AI autopilot to apply to suitable jobs automatically
- Monitor progress in real-time

### 5. **Dashboard & Tracking**
- View application history and statistics
- Track AI run results and success rates
- Manage your profile and preferences

## 🛠️ Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
# Install development dependencies
pip install -r requirements.txt

# Run with auto-reload
uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000
```

### Code Style
- **Frontend**: ESLint + Prettier for JavaScript/React
- **Backend**: Black + isort for Python formatting
- **CSS**: Tailwind CSS with custom design system

## � Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL=sqlite:///./data/app.db

# JWT Secret
JWT_SECRET_KEY=your-secret-key-here

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Customization
- **Design System**: Modify `frontend/src/index.css` for colors and styling
- **AI Behavior**: Adjust parameters in `backend/ai_agents.py`
- **Database Schema**: Update models in `backend/models.py`

## 🚀 Deployment

### 🌐 Production Deployment (Current)

The application is fully deployed and production-ready:

- **Frontend (Vercel)**: https://agenthire-ten.vercel.app
  - Automatic deployments from GitHub main branch
  - Global CDN with edge caching
  - Environment variables configured for production API

- **Backend (Render)**: https://agent-hire-backend.onrender.com  
  - Auto-scaling with health checks
  - Persistent SQLite database
  - Environment variables for production configuration

- **Sandbox Portal (Render)**: https://agent-hire-sandbox.onrender.com
  - 220+ realistic job listings
  - Real application submission testing
  - Company data from major Indian and international firms

### 🔧 Deployment Configuration

**Frontend Environment Variables (Vercel):**
```env
VITE_API_URL=https://agent-hire-backend.onrender.com
VITE_SANDBOX_URL=https://agent-hire-sandbox.onrender.com
VITE_APP_NAME=AI Apply
```

**Backend Environment Variables (Render):**
```env
PYTHONPATH=/opt/render/project/src
DATABASE_URL=sqlite:///data/platform.db
SANDBOX_URL=https://agent-hire-sandbox.onrender.com
```

### 🐳 Local Development Build
```bash
# Build frontend for local testing
cd frontend
npm run build

# The built files will be in frontend/dist/
```

### 📊 System Status

Check the health of all deployed services:
- **Frontend Status**: Visit https://agenthire-ten.vercel.app
- **Backend Health**: https://agent-hire-backend.onrender.com/
- **Sandbox Portal**: https://agent-hire-sandbox.onrender.com/api/portal/status
- **Job Listings**: https://agent-hire-sandbox.onrender.com/api/jobs

## 🎯 Demo Features

### 📋 Sandbox Job Portal
The deployed sandbox portal includes:
- **220+ Job Listings** from real companies
- **Indian Companies**: TCS, Infosys, Wipro, HCL, Tech Mahindra, Flipkart, Zomato, Paytm, BYJU'S, Ola, Swiggy, Razorpay
- **International Companies**: Google, Microsoft, Amazon
- **Realistic Salaries**: ₹4-25 LPA for full-time, ₹8k-25k/month for internships
- **Indian Locations**: Bangalore, Mumbai, Pune, Hyderabad, Chennai, Delhi NCR, etc.
- **Diverse Roles**: Software Engineer, Data Scientist, Product Manager, Mobile Developer, etc.

### 🤖 AI-Powered Features
- **Smart Job Matching**: AI analyzes 220+ jobs and ranks by compatibility
- **Automated Applications**: Submits personalized applications to sandbox portal
- **Real-time Tracking**: Monitor applications with receipt IDs and status updates
- **Failure Handling**: Automatic retries and comprehensive error reporting
- **Daily Limits**: Respects application limits to prevent spam

## 🧪 Testing the System

### End-to-End Demo Flow:
1. **Profile Creation**: Upload resume → AI extracts structured data
2. **Job Discovery**: AI ranks 220+ jobs by match score
3. **Application Queue**: Shows 30+ suitable positions
4. **Automated Applications**: AI applies to 10+ jobs automatically  
5. **Portal Verification**: Check submitted applications in sandbox portal
6. **Results Tracking**: View success/failure rates with detailed logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing frontend framework
- **FastAPI** for the high-performance backend framework
- **Tailwind CSS** for the utility-first CSS framework
- **OpenAI** for AI capabilities inspiration

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

**Built with ❤️ using React, FastAPI, and AI**