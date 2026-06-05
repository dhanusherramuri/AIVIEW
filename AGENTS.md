# AGENTS.md

## Project Overview
AI Interview Assistant - React/Vite frontend + Express/MongoDB backend with Gemini AI integration.

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

## API Routes
- `/api/auth` - Authentication (signup, login, me)
- `/api/interview` - Interview operations (start, answer, complete, history)
- `/api/health` - Health check endpoint

## Environment Setup

**server/.env:**
- `PORT=5000`
- `MONGODB_URI=<your MongoDB connection string>`
- `JWT_SECRET=<your secret>`
- `GEMINI_API_KEY=<your Gemini API key>`
- `GEMINI_MODEL=gemini-2.0-flash`

**client/.env:**
- `VITE_API_URL=http://localhost:5000/api`

## Key Patterns
- Service layer pattern for AI integration (`server/services/`)
- Protected routes use `ProtectedRoute` component + `protect` middleware
- Auth state managed via `AuthContext` with localStorage persistence
- Interview data stored in MongoDB with user ownership

## Feature Status
Check `PROJECT_CHECKLIST.md` for completed/pending features.