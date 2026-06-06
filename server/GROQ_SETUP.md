# Groq AI Setup Guide

## Why Groq?

Groq provides **completely free** access to powerful open-source models with:
- ✅ **No rate limits** (as of 2024)
- ✅ **Extremely fast** inference (10x faster than typical APIs)
- ✅ **High quality** models (Llama 3.2, Mixtral, Gemma)
- ✅ **Free tier** with generous limits

## Quick Setup

### 1. Get Your API Key

1. Visit: https://console.groq.com/keys
2. Sign up or log in
3. Click "Create API Key"
4. Copy your key (starts with `gsk_`)

### 2. Update Environment Variables

In `server/.env`:

```bash
# Groq AI Configuration
GROQ_API_KEY=gsk_your_key_here
GROQ_MODEL=llama-3.2-90b-vision-preview

# Set to false to use real Groq AI
USE_MOCK_AI=false
```

### 3. Available Models

| Model | Description | Best For |
|-------|-------------|----------|
| `llama-3.2-90b-vision-preview` | Latest Llama 3.2 90B | **Recommended** - Best overall |
| `llama-3.2-70b-versatile` | Llama 3.2 70B | Fast, high-quality text |
| `mixtral-8x7b-32768` | Mixtral 8x7B | Complex reasoning |
| `gemma2-9b-it` | Google Gemma 2 9B | Lightweight tasks |

### 4. Restart Server

```bash
cd server
npm run dev
```

## Groq vs Gemini Comparison

| Feature | Groq | Gemini Free |
|---------|------|-------------|
| Cost | Free | Free tier limited |
| Rate Limits | None (currently) | 15/min, 1000/day |
| Speed | ⚡ Very fast | Moderate |
| Models | Llama, Mixtral, Gemma | Gemini only |
| Key Format | `gsk_...` | `AIza...` |

## Troubleshooting

### "Invalid API Key" Error
- Ensure key starts with `gsk_`
- Check for extra spaces in `.env`
- Restart server after changing `.env`

### Model Not Found Error
- Use exact model name from table above
- Check Groq console for available models

### Fallback to Mock AI
If Groq fails, system automatically falls back to mock AI when:
- API key is invalid
- Network error occurs
- Service unavailable

## Monitoring Usage

Check your Groq usage at: https://console.groq.com/usage

## Future: Text-to-Speech (TTS) Integration

For TTS features (planned for Iteration 2+), consider:

### Free TTS Options:
1. **ElevenLabs** - Free tier: 10,000 chars/month
2. **Google Cloud TTS** - Free tier: 4M chars/month
3. **Azure Speech** - Free tier: 500K chars/month
4. **Coqui TTS** - Open source, self-hosted

### Recommended: Google Cloud TTS
- Generous free tier
- High quality voices
- Easy integration
- Pay-as-you-go after free limit

## Future: Resume Reading Feature

For resume parsing (planned for later iterations):

### Approach:
1. **PDF/Doc Upload** - User uploads resume
2. **Text Extraction** - Use libraries like `pdf-parse` or `mammoth`
3. **AI Analysis** - Send extracted text to Groq for:
   - Skills extraction
   - Experience summarization
   - Role matching
   - Question generation based on resume

### Required Packages:
```bash
npm install pdf-parse mammoth multer
```

### Implementation Steps:
1. Add file upload endpoint
2. Extract text from resume
3. Use Groq to analyze and extract key info
4. Generate personalized questions based on resume

## API Reference

### Groq SDK Usage

```javascript
import Groq from 'groq-sdk';

const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
});

const response = await groq.chat.completions.create({
  model: 'llama-3.2-90b-vision-preview',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello!' }
  ],
  temperature: 0.7,
  max_tokens: 1024,
});

console.log(response.choices[0].message.content);
```

## Resources

- Groq Console: https://console.groq.com
- Groq Docs: https://console.groq.com/docs
- Model Info: https://console.groq.com/docs/models
- API Keys: https://console.groq.com/keys

---

**Last Updated:** June 5, 2026  
**Status:** ✅ Ready to use