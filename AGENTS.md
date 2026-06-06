# AGENTS.md

## Project Overview
AI Interview Assistant - React/Vite frontend + Express/MongoDB backend with Groq AI integration.

## Commands

**Backend:**
```bash
cd server
npm install        # Install dependencies
npm run dev        # Start with nodemon on port 5000
npm start          # Production start
```

**Frontend:**
```bash
cd client
npm install        # Install dependencies
npm run dev        # Start Vite dev server on port 3000
npm run build      # Production build
```

## Architecture
- Monorepo structure: `client/` and `server/` are separate packages
- Backend: Express.js with ES modules (`"type": "module"`)
- Frontend: React 18, Vite, Tailwind CSS
- Auth: JWT tokens stored in localStorage
- All API requests go through backend (never call external APIs from frontend)

## AI Provider: Groq (Free Alternative to Gemini)

**Why Groq:** Completely free, extremely fast, no rate limits (as of 2024)

**Setup:**
1. Get API key: https://console.groq.com/keys
2. Add to `server/.env`:
```bash
GROQ_API_KEY=gsk_your_key_here
GROQ_MODEL=llama-3.2-90b-vision-preview
USE_MOCK_AI=false
```

**Available Models:**
- `llama-3.3-70b-versatile` - Best overall (recommended)
- `llama-3.1-8b-instant` - Fast, lightweight
- `mixtral-8x7b-32768` - Complex reasoning
- `gemma2-9b-it` - Lightweight tasks

**Fallback:** System auto-fallbacks to mock AI if Groq fails

## API Routes
- `/api/auth` - Authentication (signup, login, me)
- `/api/interview` - Interview operations (start, answer, complete, history)
- `/api/health` - Health check endpoint

## Environment Setup

**server/.env:**
- `PORT=5000`
- `MONGODB_URI=<your MongoDB connection string>`
- `JWT_SECRET=<your secret>`
- `GROQ_API_KEY=<your Groq API key from console.groq.com>`
- `GROQ_MODEL=llama-3.2-90b-vision-preview`
- `USE_MOCK_AI=false` (set to `true` for development without using API)

**client/.env:**
- `VITE_API_URL=http://localhost:5000/api`

## Key Patterns
- Service layer pattern for AI integration (`server/services/ai/`)
- Protected routes use `ProtectedRoute` component + `protect` middleware
- Auth state managed via `AuthContext` with localStorage persistence
- Interview data stored in MongoDB with user ownership

## AI Service Structure
```
server/src/services/ai/
├── groqClient.js      # Groq SDK initialization
├── generateContent.js # Main content generation via Groq
├── questionService.js # Question generation
├── feedbackService.js # Answer feedback
├── evaluationService.js # Final evaluation
└── mockAiService.js   # Fallback mock AI
```

## Development Workflow
1. **Start backend:** `cd server && npm run dev`
2. **Start frontend:** `cd client && npm run dev`
3. **Access app:** http://localhost:3000
4. **For development without API:** Set `USE_MOCK_AI=true`

## Testing
- Manual testing only (no automated tests yet)
- Test flow: Signup → Login → Start Interview → Answer Questions → Complete → View History
- Mock AI mode available for development without consuming API credits

## Future Features (See ROADMAP.md)
- **Iteration 2:** Text-to-Speech (TTS) and Speech-to-Text (STT)
- **Iteration 3:** Resume upload and AI-powered analysis
- **Iteration 4:** Analytics dashboard
- **Iteration 5:** Electron desktop app

## Troubleshooting

**Groq API errors:**
- Check API key format (should start with `gsk_`)
- Verify key is copied without extra spaces
- Restart server after changing `.env`
- System falls back to mock AI on failures

**MongoDB connection errors:**
- Verify connection string in `.env`
- Ensure IP is whitelisted in MongoDB Atlas

**Frontend won't connect:**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in client/.env

## References
- Groq Console: https://console.groq.com
- Groq Docs: https://console.groq.com/docs
- Groq Setup Guide: `server/GROQ_SETUP.md`
- Roadmap: `ROADMAP.md`
- Project Checklist: `PROJECT_CHECKLIST.md`