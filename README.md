# AI Interview Assistant

An AI-powered interview preparation application that helps users prepare for technical and HR interviews.

## Tech Stack

**Frontend:**
- React
- Vite
- Tailwind CSS
- React Router

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB Atlas
- Mongoose

**Authentication:**
- JWT
- bcrypt

## Project Structure

```
ai-interview-assistant/
├── client/          # React frontend
├── server/          # Express backend
├── docs/            # Documentation
└── README.md        # This file
```

## Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB

### Environment Setup

1. Clone the repository
2. Set up backend environment variables (see `server/.env.example`)
3. Set up frontend environment variables (see `client/.env.example`)

### Running the Application

**Backend:**
```bash
cd server
npm install
npm run dev
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

## Iteration Status

Current Iteration: **1 (Interview Core)**

Completed:
- User authentication (signup, login)
- Protected routes
- Landing, Login, Signup, and Dashboard pages
- MongoDB integration
- AI interview flow with Gemini
- Interview setup (role, difficulty selection)
- Chat-based interview interface
- Interview history tracking
- Final evaluation and scoring

See `PROJECT_CHECKLIST.md` for detailed status.