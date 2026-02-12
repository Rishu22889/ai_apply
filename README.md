# AI Apply - Intelligent Job Application System

> An AI-powered platform that automates job searching and applications using intelligent matching algorithms.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://agenthire-ten.vercel.app)
[![Backend API](https://img.shields.io/badge/API-active-blue)](https://agent-hire-backend.onrender.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🌟 Overview

AI Apply is a full-stack web application that revolutionizes the job application process by using artificial intelligence to:
- Automatically parse and analyze your resume
- Match you with suitable job opportunities
- Generate personalized applications
- Track your application history
- Respect your preferences and constraints

## ✨ Key Features

### 🤖 AI-Powered Automation
- **Smart Resume Parsing**: Extracts skills, education, projects, and experience from PDF/Word/text files
- **Intelligent Job Matching**: AI ranks 220+ jobs based on your profile with detailed reasoning
- **Automated Applications**: Applies to suitable positions automatically with personalized content
- **Daily Limit Control**: Respects your application limits to prevent spam

### 📊 Comprehensive Dashboard
- Real-time application tracking
- Detailed statistics and analytics
- Application history with status updates
- Profile management and editing

### 🎨 Modern User Interface
- Beautiful gradient-based design
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Intuitive navigation

### 🔒 Safety & Privacy
- Secure authentication with JWT
- Schema validation for data integrity
- Application history preservation
- No data shared without consent

## 🚀 Live Demo

**Try it now:** [https://agenthire-ten.vercel.app](https://agenthire-ten.vercel.app)

**Features to explore:**
1. Upload your resume and see AI extraction in action
2. Browse 220+ realistic job listings
3. View AI match scores and reasoning
4. Run autopilot to apply automatically
5. Track all applications in the dashboard

## �️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **FastAPI** - High-performance Python API
- **SQLite** - Lightweight database
- **Pydantic** - Data validation
- **JWT** - Secure authentication
- **pdfplumber** - PDF text extraction

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend & sandbox portal hosting
- **GitHub Actions** - CI/CD pipeline

## � Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Quick Start (Recommended) 🚀

The easiest way to start all services locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rishu22889/ai-apply.git
   cd ai-apply
   ```

2. **Start all services with one command**
   ```bash
   ./start.sh
   ```
   
   This will automatically:
   - Create and activate virtual environment
   - Install Python dependencies
   - Install frontend dependencies
   - Start backend server (port 8000)
   - Start frontend server (port 3000)
   - Start sandbox portal (port 5001)

3. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - Sandbox Portal: `http://localhost:5001`

4. **Stop all services**
   ```bash
   ./stop.sh
   ```

### Manual Setup

If you prefer to start services individually:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rishu22889/ai-apply.git
   cd ai-apply
   ```

2. **Backend Setup**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Run backend server
   python run.py
   ```
   Backend runs at `http://localhost:8000`

3. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd frontend
   
   # Install dependencies
   npm install
   
   # Run development server
   npm run dev
   ```
   Frontend runs at `http://localhost:3000`

4. **Sandbox Portal (Optional)**
   ```bash
   # In a new terminal
   python sandbox/job_portal.py
   ```
   Sandbox portal runs at `http://localhost:5001`

## 📖 Usage Guide

### 1. Create Your Profile
- Register a new account
- Upload your resume (PDF, Word, or text)
- Review and edit the AI-generated profile
- Set your preferences and constraints

### 2. Browse Jobs
- View 220+ job listings from the sandbox portal
- See AI match scores and detailed reasoning
- Filter by status (will apply, applied, rejected)

### 3. Run Autopilot
- Click "Start Autopilot" to begin automated applications
- AI applies to suitable jobs respecting your daily limit
- Monitor progress in real-time

### 4. Track Applications
- View all applications in the dashboard
- Check status (submitted, skipped, failed)
- See detailed application history

## 🏗️ Project Structure

```
ai-apply/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── api.js        # API client
│   │   └── App.jsx       # Main app component
│   └── package.json
├── backend/              # FastAPI backend
│   ├── app.py           # Main API application
│   ├── auth.py          # Authentication
│   ├── database.py      # Database operations
│   ├── engine.py        # Autopilot engine
│   ├── ai_agents.py     # AI processing
│   └── models.py        # Data models
├── core/                # Core business logic
│   ├── generator.py     # Application generation
│   ├── scorer.py        # Job scoring
│   ├── tracker.py       # Application tracking
│   └── validator.py     # Data validation
├── schemas/             # Data schemas
│   ├── user_profile_schema.py
│   ├── job_schema.py
│   └── student_schema.py
├── sandbox/             # Sandbox job portal
│   └── job_portal.py
├── tests/               # Test suite
├── requirements.txt     # Python dependencies
└── package.json         # Node.js scripts
```

## 🔧 Configuration

### Environment Variables

**Backend** (`.env`):
```env
DATABASE_URL=sqlite:///./data/platform.db
JWT_SECRET_KEY=your-secret-key-here
SANDBOX_URL=http://localhost:5001
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:8000
VITE_SANDBOX_URL=http://localhost:5001
```

## 🧪 Testing

```bash
# Run backend tests
pytest

# Run frontend tests
cd frontend
npm test
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- FastAPI for the excellent Python framework
- React team for the amazing frontend library
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using React, FastAPI, and AI**
