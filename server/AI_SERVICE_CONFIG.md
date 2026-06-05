# AI Service Configuration

## Overview
The application now supports both real Gemini AI and a mock AI service for development/testing.

## Environment Variables

### server/.env

```bash
# Gemini API Configuration
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.0-flash

# Mock AI Configuration
# Set to 'true' to use mock AI (useful when API quota is exceeded)
USE_MOCK_AI=true
```

## When to Use Mock AI

### Use `USE_MOCK_AI=true` when:
- ✅ You've exceeded your Gemini API free tier quota (Error 429)
- ✅ Developing and testing without using API credits
- ✅ Working offline or with poor internet connection
- ✅ Running automated tests

### Use `USE_MOCK_AI=false` when:
- ✅ You want real AI-powered interviews
- ✅ You have available API quota
- ✅ Production deployment
- ✅ Demonstrating the full AI capabilities

## Automatic Fallback

The system automatically falls back to mock AI when:
- Gemini API returns error 429 (quota exceeded)
- Any other API connectivity issues occur

This ensures the interview can continue even if the API is unavailable.

## Mock AI Features

The mock AI service provides:
- ✅ Role-specific questions (MERN, Frontend, Backend, Java, DevOps, Cybersecurity)
- ✅ Realistic feedback based on answers
- ✅ Final evaluation with scores and recommendations
- ✅ Simulated API delays for realistic experience

## Switching Between Modes

### To use Mock AI:
```bash
# In server/.env
USE_MOCK_AI=true
```

### To use Real Gemini AI:
```bash
# In server/.env
USE_MOCK_AI=false
```

**Note:** After changing the `.env` file, restart the server:
```bash
cd server
npm run dev
```

## Getting a New Gemini API Key

If you need a new API key:
1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Create a new API key
4. Copy it to `server/.env` as `GEMINI_API_KEY`

## Monitoring API Usage

Check your Gemini API usage at:
https://ai.dev/rate-limit

## Rate Limits (Free Tier)

- 15 requests per minute
- 1,000 requests per day
- 1,000,000 tokens per minute

When exceeded, you'll see error 429 "Too Many Requests"