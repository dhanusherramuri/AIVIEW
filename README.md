# AI Interview Assistant

An AI-powered interview preparation application that helps users prepare for technical and HR interviews through real-time question generation, response evaluation, and detailed feedback.

![Status](https://img.shields.io/badge/version-1.5.0-blue)
![Iteration](https://img.shields.io/badge/iteration-1.5-green)
![License](https://img.shields.io/badge/license-MIT-yellow)

## 🎯 Features

### Core Functionality
- ✅ **User Authentication** - Secure signup/login with JWT tokens
- ✅ **AI-Powered Interviews** - Real-time question generation based on role & difficulty
- ✅ **6 Interview Tracks** - MERN, Frontend, Backend, Java, DevOps, Cybersecurity
- ✅ **3 Difficulty Levels** - Easy, Medium, Hard
- ✅ **Real-time Feedback** - Instant evaluation of your answers
- ✅ **Interview History** - Track all your past interviews
- ✅ **Final Scoring** - Comprehensive assessment with strengths & areas for improvement
- ✅ **Protected Dashboard** - Secure user-specific data

### AI Features (Iteration 1.5)
- ✅ **Smart Question Generation** - Context-aware questions powered by Groq AI
- ✅ **Response Analysis** - Detailed feedback on each answer
- ✅ **Conversation Memory** - AI maintains context throughout the interview
- ✅ **Automatic Fallback** - Mock AI service when API fails
- ✅ **Structured Logging** - Complete audit trail of AI interactions
- ✅ **Error Resilience** - Retry logic and graceful degradation

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite (Fast build tool)
- Tailwind CSS (Utility-first CSS)
- React Router DOM (Navigation)
- Axios (HTTP client)

**Backend:**
- Node.js
- Express.js (REST API)
- ES Modules (Modern JavaScript)

**Database:**
- MongoDB Atlas (Cloud database)
- Mongoose (ODM)

**Authentication & Security:**
- JWT (JSON Web Tokens)
- bcrypt (Password hashing)
- CORS (Cross-origin security)

**AI Integration:**
- Groq API (Primary - Llama 3.2, Mixtral, Gemma models)
- Mock AI Service (Fallback)
- Custom prompt engineering

## 📁 Project Structure

```
ai-interview-assistant/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/           # React context (Auth)
│   │   │   └── AuthContext.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── InterviewSetupPage.jsx
│   │   │   └── InterviewPage.jsx
│   │   ├── services/          # API services
│   │   │   └── api.js
│   │   ├── main.jsx           # Entry point
│   │   └── App.jsx            # Main app component
│   ├── .env                   # Environment variables
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   └── package.json
│
├── server/                     # Express backend
│   ├── src/
│   │   ├── services/ai/       # AI services
│   │   │   ├── groqClient.js
│   │   │   ├── generateContent.js
│   │   │   ├── questionService.js
│   │   │   ├── feedbackService.js
│   │   │   ├── evaluationService.js
│   │   │   └── mockAiService.js
│   │   ├── prompts/           # AI prompt templates
│   │   │   ├── questionPrompt.js
│   │   │   ├── feedbackPrompt.js
│   │   │   └── finalEvaluationPrompt.js
│   │   ├── utils/             # Utility functions
│   │   │   ├── logger.js
│   │   │   ├── retryAsync.js
│   │   │   ├── parseGeminiResponse.js
│   │   │   └── validateAIResponse.js
│   │   └── models/            # Database models
│   │       ├── User.js
│   │       └── Interview.js
│   ├── config/                # Configuration
│   │   └── db.js
│   ├── controllers/           # Route controllers
│   │   ├── authController.js
│   │   └── interviewController.js
│   ├── middleware/            # Express middleware
│   │   └── auth.js
│   ├── routes/                # API routes
│   │   ├── authRoutes.js
│   │   └── interviewRoutes.js
│   ├── services/              # Service layer
│   │   └── groqService.js
│   ├── .env                   # Environment variables
│   ├── server.js              # Main server entry
│   └── package.json
│
├── docs/                       # Documentation
├── PROJECT_REQUIREMENTS.md     # Product requirements
├── PROJECT_CHECKLIST.md        # Implementation status
├── AGENTS.md                   # Development guidelines
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- MongoDB Atlas account (free tier works)
- Groq API key (free from Groq Console)

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd ai-interview-assistant
```

### 2. Backend Setup
```bash
cd server
npm install
```

Configure environment variables in `server/.env`:
```bash
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interview-db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
GROQ_API_KEY=your_groq_api_key_from_console.groq.com
GROQ_MODEL=llama-3.3-70b-versatile
USE_MOCK_AI=false
```

**Get Groq API Key:**
1. Visit https://console.groq.com/keys
2. Sign up or log in
3. Click "Create API Key"
4. Copy your key (starts with `gsk_`) and paste into `.env`

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Configure environment variables in `client/.env`:
```bash
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the Application

**Start Backend (Terminal 1):**
```bash
cd server
npm run dev
```
Server runs on http://localhost:5000

**Start Frontend (Terminal 2):**
```bash
cd client
npm run dev
```
Frontend runs on http://localhost:3000

### 5. Access Application
Open browser and navigate to: **http://localhost:3000**

## 📖 Usage Guide

### 1. Create Account
- Click "Sign Up" on the landing page
- Enter your name, email, and password
- You'll be automatically logged in

### 2. Start Interview
- Click "Start Interview" from dashboard
- Select your role (MERN, Frontend, Backend, Java, DevOps, or Cybersecurity)
- Choose difficulty (Easy, Medium, or Hard)
- Click "Start Interview"

### 3. Answer Questions
- Read the AI-generated question
- Type your answer in the chat box
- Submit to receive instant feedback
- Continue through multiple questions

### 4. Get Results
- Complete all questions (or click "End Interview")
- Receive final evaluation with:
  - Overall score (0-100)
  - Strengths identified
  - Areas for improvement
  - Personalized recommendations

### 5. View History
- Access dashboard to see all past interviews
- Review previous scores and feedback
- Track your improvement over time

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Create new account | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Interviews
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/interview/start` | Start new interview | Yes |
| POST | `/api/interview/:id/answer` | Submit answer | Yes |
| POST | `/api/interview/:id/complete` | Complete interview | Yes |
| GET | `/api/interview/:id` | Get interview details | Yes |
| GET | `/api/interviews` | Get user's history | Yes |

### Health Check
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Check server status | No |

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Protected Routes** - Middleware validation
- **Input Validation** - Server-side checks
- **CORS Protection** - Configured origins
- **Environment Variables** - Secrets never committed

## 🧪 Testing

### Manual Testing Checklist
- ✅ User signup flow
- ✅ User login flow
- ✅ Protected route redirection
- ✅ Invalid credentials handling
- ✅ Start interview flow
- ✅ Answer submission
- ✅ Interview completion
- ✅ History retrieval

### Run Tests (Future)
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 📊 Current Status

### Completed (Iteration 1.5)
✅ **Foundation Layer** - Authentication, database, routing  
✅ **Interview Core** - AI questions, feedback, scoring  
✅ **AI Hardening** - Prompts, validation, retry logic, logging  
✅ **Fallback System** - Mock AI for error handling  

### Next Up (Iteration 2: Analytics)
🔲 Performance analytics dashboard  
🔲 Score tracking and visualization  
🔲 Progress charts over time  
🔲 Detailed interview insights  

See `PROJECT_CHECKLIST.md` for complete status.

## ⚠️ Known Issues

### API Quota Limits
- Groq free tier: Generous limits (as of 2024)
- When errors occur, system auto-fallbacks to mock AI
- **Solution:** Set `USE_MOCK_AI=true` in `.env` for development without API usage

### Mock AI Mode
- Provides realistic questions but not truly AI-generated
- **To enable real AI:** Get valid Groq API key and set `USE_MOCK_AI=false`

## 🛠️ Troubleshooting

### Backend won't start
```bash
# Check MongoDB connection
# Verify server/.env has correct MONGODB_URI
# Ensure port 5000 is available
```

### Frontend won't connect
```bash
# Verify client/.env has correct VITE_API_URL
# Ensure backend is running on port 5000
# Check browser console for CORS errors
```

### AI not generating questions
```bash
# Check GROQ_API_KEY in server/.env
# Verify key format (should start with gsk_)
# Check Groq console for API status
# Set USE_MOCK_AI=true as temporary solution
```

### Login/Signup fails
```bash
# Verify MongoDB connection
# Check JWT_SECRET is set
# Ensure bcrypt is installed
```

## 📝 Environment Variables Reference

### Server (.env)
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 5000 | Server port |
| `MONGODB_URI` | **Yes** | - | MongoDB connection string |
| `JWT_SECRET` | **Yes** | - | Secret for JWT tokens |
| `GROQ_API_KEY` | **Yes** | - | Groq API key |
| `GROQ_MODEL` | No | llama-3.3-70b-versatile | AI model to use |
| `USE_MOCK_AI` | No | false | Use mock AI service |

### Client (.env)
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | **Yes** | - | Backend API base URL |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Groq AI for powering the interviews with fast, free models
- React and Express communities
- MongoDB for the database
- All contributors

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review PROJECT_REQUIREMENTS.md

---

**Last Updated:** June 6, 2026  
**Current Version:** 1.5.0  
**Iteration:** 1.5 (AI Hardening Complete)