# 🤝 Contributing to OTT Platform

Thank you for your interest in contributing to the OTT Platform! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Maintain professional communication

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ott-platform.git
   cd ott-platform
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/ott-platform.git
   ```

4. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

5. **Set up environment variables**
   ```bash
   # Copy example files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

6. **Seed database**
   ```bash
   cd backend
   npm run seed
   ```

7. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

## 🔄 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `style/` - Code style changes

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run backend tests (if available)
cd backend
npm test

# Run frontend tests (if available)
cd frontend
npm test

# Manual testing
# - Test all affected features
# - Check responsive design
# - Verify error handling
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "type: brief description"
```

See [Commit Guidelines](#commit-guidelines) below.

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub
- Click "New Pull Request"
- Fill in the PR template
- Wait for review

## 📝 Coding Standards

### JavaScript/React

**Use ES6+ features:**
```javascript
// Good
const handleClick = () => { ... };
const { name, email } = user;

// Avoid
var handleClick = function() { ... };
var name = user.name;
var email = user.email;
```

**Use functional components:**
```javascript
// Good
const MyComponent = ({ prop1, prop2 }) => {
  return <div>...</div>;
};

// Avoid
class MyComponent extends React.Component {
  render() {
    return <div>...</div>;
  }
}
```

**Use hooks properly:**
```javascript
// Good
const [state, setState] = useState(initialValue);
useEffect(() => {
  // effect
  return () => {
    // cleanup
  };
}, [dependencies]);

// Avoid missing dependencies
useEffect(() => {
  doSomething(prop);
}, []); // Missing 'prop' in dependencies
```

### Backend

**Use async/await:**
```javascript
// Good
const fetchData = async () => {
  try {
    const data = await Model.find();
    return data;
  } catch (error) {
    throw error;
  }
};

// Avoid
const fetchData = () => {
  return Model.find()
    .then(data => data)
    .catch(error => { throw error; });
};
```

**Error handling:**
```javascript
// Good
try {
  const result = await operation();
  res.json({ success: true, data: result });
} catch (error) {
  res.status(500).json({ 
    success: false, 
    message: error.message 
  });
}
```

**Input validation:**
```javascript
// Always validate inputs
if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: 'Email and password required'
  });
}
```

### CSS/Tailwind

**Use Tailwind utilities:**
```jsx
// Good
<div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">

// Avoid inline styles
<div style={{ display: 'flex', padding: '16px' }}>
```

**Responsive design:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

### File Organization

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── services/        # API services
├── redux/           # State management
├── utils/           # Helper functions
└── App.js           # Main app
```

## 💬 Commit Guidelines

### Commit Message Format

```
type: subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
feat: add video download functionality

fix: resolve video streaming issue on mobile

docs: update API documentation

style: format code with prettier

refactor: optimize video loading performance

test: add tests for authentication

chore: update dependencies
```

### Best Practices

- Use present tense ("add" not "added")
- Use imperative mood ("move" not "moves")
- Keep subject line under 50 characters
- Capitalize first letter
- No period at the end
- Provide detailed body if needed

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console.logs or debug code
- [ ] Tests pass (if applicable)
- [ ] No merge conflicts

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### Review Process

1. Submit PR
2. Automated checks run
3. Code review by maintainers
4. Address feedback
5. Approval and merge

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Registration works
- [ ] Email login works
- [ ] Phone OTP login works
- [ ] Password reset works
- [ ] Token refresh works

**Video Features:**
- [ ] Video upload works
- [ ] Video streaming works
- [ ] Search works
- [ ] Filters work
- [ ] Watchlist works

**Subscription:**
- [ ] Plan display works
- [ ] Subscription purchase works
- [ ] Access control works

**Admin:**
- [ ] Dashboard loads
- [ ] User management works
- [ ] Video management works

**Responsive:**
- [ ] Mobile view works
- [ ] Tablet view works
- [ ] Desktop view works

### Browser Testing

Test on:
- Chrome
- Firefox
- Safari
- Edge

## 📚 Documentation

### Code Comments

```javascript
/**
 * Fetches user profile from API
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} User profile data
 */
const fetchUserProfile = async (userId) => {
  // Implementation
};
```

### README Updates

Update README.md if you:
- Add new features
- Change setup process
- Add dependencies
- Modify API endpoints

### API Documentation

Update API_DOCUMENTATION.md if you:
- Add new endpoints
- Modify existing endpoints
- Change request/response format

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]

**Additional context**
Any other information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Description of the problem

**Describe the solution**
How should it work?

**Describe alternatives**
Other solutions considered

**Additional context**
Mockups, examples, etc.
```

## 🎯 Areas for Contribution

### High Priority
- Real payment gateway integration (Stripe)
- Real OTP service (Twilio)
- Email service integration
- Video transcoding
- Advanced search filters

### Medium Priority
- Social login (Google, Facebook)
- Comments and ratings
- Download functionality
- Multi-language support
- Push notifications

### Low Priority
- Dark/Light theme toggle
- Keyboard shortcuts
- Advanced analytics
- Content recommendations AI

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## 📞 Getting Help

- Create an issue for questions
- Join discussions
- Check existing documentation
- Ask in pull request comments

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing! 🎉**

Every contribution, no matter how small, makes a difference!
