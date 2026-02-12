# Development Guide

This guide covers local development setup and best practices for contributing to AI Apply.

## 🛠️ Development Setup

### Prerequisites

- **Python 3.8+** - Backend runtime
- **Node.js 16+** - Frontend runtime
- **Git** - Version control
- **VS Code** (recommended) - Code editor

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rishu22889/ai-apply.git
   cd ai-apply
   ```

2. **Backend Setup**
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # On macOS/Linux:
   source venv/bin/activate
   # On Windows:
   venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Create data directory
   mkdir -p data
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Environment Configuration**
   
   Create `.env` in root:
   ```env
   DATABASE_URL=sqlite:///./data/platform.db
   JWT_SECRET_KEY=dev-secret-key-change-in-production
   SANDBOX_URL=http://localhost:5001
   ```
   
   Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:8000
   VITE_SANDBOX_URL=http://localhost:5001
   ```

## 🚀 Running the Application

### Start All Services

**Terminal 1 - Backend:**
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
python run.py
```
Backend runs at `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs at `http://localhost:5173`

**Terminal 3 - Sandbox Portal (Optional):**
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
python sandbox/job_portal.py
```
Sandbox runs at `http://localhost:5001`

### Quick Start Script

Use the provided setup script:
```bash
chmod +x setup.sh
./setup.sh
```

## 📁 Project Structure

```
ai-apply/
├── backend/              # FastAPI backend
│   ├── app.py           # Main API application
│   ├── auth.py          # Authentication logic
│   ├── database.py      # Database operations
│   ├── engine.py        # Autopilot engine
│   ├── ai_agents.py     # AI processing
│   ├── models.py        # Pydantic models
│   └── job_fetcher.py   # Job portal integration
├── core/                # Core business logic
│   ├── generator.py     # Application generation
│   ├── scorer.py        # Job scoring algorithms
│   ├── tracker.py       # Application tracking
│   └── validator.py     # Data validation
├── schemas/             # Data schemas
│   ├── user_profile_schema.py
│   ├── job_schema.py
│   └── student_schema.py
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── api.js       # API client
│   │   └── App.jsx      # Main app
│   └── package.json
├── sandbox/             # Sandbox job portal
│   └── job_portal.py
├── tests/               # Test suite
├── requirements.txt     # Python dependencies
└── package.json         # Node.js scripts
```

## 🧪 Testing

### Backend Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=backend --cov=core

# Run specific test file
pytest tests/test_basic.py

# Run with verbose output
pytest -v
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 🎨 Code Style

### Python (Backend)

We follow PEP 8 style guide:

```bash
# Format code with black
black backend/ core/ schemas/

# Sort imports with isort
isort backend/ core/ schemas/

# Lint with flake8
flake8 backend/ core/ schemas/
```

### JavaScript (Frontend)

We use ESLint and Prettier:

```bash
cd frontend

# Lint code
npm run lint

# Format code
npm run format
```

## 🔧 Development Tools

### VS Code Extensions (Recommended)

- **Python** - Python language support
- **Pylance** - Python language server
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **Thunder Client** - API testing

### API Testing

Use the built-in Swagger UI:
- Navigate to `http://localhost:8000/docs`
- Test all API endpoints interactively

Or use Thunder Client / Postman:
```bash
# Example: Register user
POST http://localhost:8000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "testpassword"
}
```

## 🐛 Debugging

### Backend Debugging

Add breakpoints in VS Code:
1. Set breakpoint in code
2. Run "Python: FastAPI" debug configuration
3. Make API request to trigger breakpoint

Or use print debugging:
```python
print(f"DEBUG: Variable value = {variable}")
```

### Frontend Debugging

Use browser DevTools:
1. Open Chrome DevTools (F12)
2. Go to Sources tab
3. Set breakpoints in JavaScript code
4. Interact with the app

Or use console logging:
```javascript
console.log('DEBUG: Variable value =', variable);
```

## 📊 Database Management

### View Database

```bash
# Install SQLite browser
# macOS: brew install --cask db-browser-for-sqlite
# Windows: Download from https://sqlitebrowser.org/

# Open database
open data/platform.db
```

### Reset Database

```bash
# Delete database file
rm data/platform.db

# Restart backend to recreate tables
python run.py
```

### Database Migrations

For schema changes:
1. Update models in `backend/database.py`
2. Delete old database: `rm data/platform.db`
3. Restart backend to create new schema

## 🔄 Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation
- `refactor/code-improvement` - Code refactoring

### Commit Messages

Follow conventional commits:
```
feat: add job filtering by location
fix: resolve resume parsing error
docs: update API documentation
refactor: improve database queries
test: add tests for authentication
```

### Pull Request Process

1. Create feature branch
2. Make changes and commit
3. Push to GitHub
4. Open Pull Request
5. Wait for review
6. Merge after approval

## 🚨 Common Issues

### Backend won't start

**Issue**: `ModuleNotFoundError`
**Solution**: Activate virtual environment and reinstall dependencies
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend won't connect to backend

**Issue**: CORS errors in browser console
**Solution**: Check CORS configuration in `backend/app.py`

### Database locked error

**Issue**: `database is locked`
**Solution**: Close all connections and restart backend

### Port already in use

**Issue**: `Address already in use`
**Solution**: Kill process using the port
```bash
# Find process
lsof -i :8000

# Kill process
kill -9 <PID>
```

## 📚 Resources

### Documentation

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Pydantic Docs](https://docs.pydantic.dev/)

### Learning Resources

- [Python Best Practices](https://docs.python-guide.org/)
- [React Best Practices](https://react.dev/learn)
- [REST API Design](https://restfulapi.net/)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## 💬 Getting Help

- Open an issue on GitHub
- Check existing issues for solutions
- Review documentation

---

Happy coding! 🚀
