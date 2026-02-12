# Contributing to AI Apply

Thank you for your interest in contributing to AI Apply! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Python/Node version)

### Suggesting Features

Feature suggestions are welcome! Please open an issue with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Any relevant examples or mockups

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/Rishu22889/ai-apply.git
   cd ai-apply
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Test your changes**
   ```bash
   # Backend tests
   pytest
   
   # Frontend tests
   cd frontend && npm test
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Wait for review

## 📝 Code Style Guidelines

### Python (Backend)

- Follow [PEP 8](https://pep8.org/) style guide
- Use type hints where possible
- Write docstrings for functions and classes
- Keep functions small and focused
- Use meaningful variable names

**Example:**
```python
def calculate_match_score(user_profile: Dict[str, Any], job: JobListing) -> float:
    """
    Calculate match score between user profile and job.
    
    Args:
        user_profile: User's profile data
        job: Job listing to match against
        
    Returns:
        Match score between 0.0 and 1.0
    """
    # Implementation here
    pass
```

### JavaScript/React (Frontend)

- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Keep components small and reusable
- Add PropTypes or TypeScript types

**Example:**
```javascript
function JobCard({ job, onApply }) {
  const [isApplying, setIsApplying] = useState(false);
  
  const handleApply = async () => {
    setIsApplying(true);
    await onApply(job.id);
    setIsApplying(false);
  };
  
  return (
    <div className="card">
      <h3>{job.title}</h3>
      <button onClick={handleApply} disabled={isApplying}>
        {isApplying ? 'Applying...' : 'Apply'}
      </button>
    </div>
  );
}
```

### CSS/Tailwind

- Use Tailwind utility classes
- Follow mobile-first approach
- Keep custom CSS minimal
- Use consistent spacing and colors

## 🧪 Testing Guidelines

### Backend Tests

- Write tests for all new features
- Test edge cases and error handling
- Use pytest fixtures for setup
- Aim for >80% code coverage

**Example:**
```python
def test_user_registration():
    """Test user registration endpoint."""
    response = client.post("/api/auth/register", json={
        "email": "test@example.com",
        "password": "testpass123"
    })
    assert response.status_code == 200
    assert response.json()["success"] is True
```

### Frontend Tests

- Test component rendering
- Test user interactions
- Test API integration
- Use React Testing Library

**Example:**
```javascript
test('renders job card with title', () => {
  const job = { id: 1, title: 'Software Engineer' };
  render(<JobCard job={job} />);
  expect(screen.getByText('Software Engineer')).toBeInTheDocument();
});
```

## 📚 Documentation

- Update README.md for user-facing changes
- Update DEVELOPMENT.md for developer changes
- Add inline comments for complex logic
- Update API documentation in docstrings

## 🔍 Code Review Process

All submissions require review. We use GitHub pull requests for this purpose:

1. **Automated Checks**
   - Tests must pass
   - Code style checks must pass
   - No merge conflicts

2. **Manual Review**
   - Code quality and readability
   - Test coverage
   - Documentation updates
   - Security considerations

3. **Feedback**
   - Address reviewer comments
   - Make requested changes
   - Push updates to your branch

4. **Approval**
   - At least one approval required
   - All checks must pass
   - Ready to merge!

## 🎯 Priority Areas

We especially welcome contributions in these areas:

- **Testing**: Increase test coverage
- **Documentation**: Improve guides and examples
- **Performance**: Optimize slow operations
- **Accessibility**: Improve WCAG compliance
- **Mobile**: Enhance mobile experience
- **Internationalization**: Add multi-language support

## 🚫 What Not to Do

- Don't submit PRs without opening an issue first (for major changes)
- Don't include unrelated changes in your PR
- Don't commit sensitive data (API keys, passwords)
- Don't break existing functionality
- Don't ignore code review feedback

## 📋 Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add password reset functionality
fix(jobs): resolve job filtering bug
docs(readme): update installation instructions
test(api): add tests for job endpoints
```

## 🏆 Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Given credit in commit history

## 📞 Getting Help

- Open an issue for questions
- Check existing issues and PRs
- Review documentation
- Ask in pull request comments

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior:**
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by opening an issue or contacting the project maintainers. All complaints will be reviewed and investigated.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AI Apply! 🎉
