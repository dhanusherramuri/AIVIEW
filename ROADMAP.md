# AI Interview Assistant - Roadmap

## Current Status (Iteration 1.5) ✅

### Completed Features
- ✅ User authentication (JWT-based)
- ✅ AI-powered text interviews with Groq
- ✅ 6 interview tracks (MERN, Frontend, Backend, Java, DevOps, Cybersecurity)
- ✅ 3 difficulty levels
- ✅ Real-time feedback on answers
- ✅ Final scoring and evaluation
- ✅ Interview history tracking
- ✅ Mock AI fallback for development

### AI Provider: Groq (Free)
- **Model:** Llama 3.2 90B Vision Preview
- **Cost:** Free (as of 2024)
- **Speed:** Extremely fast inference
- **Rate Limits:** None currently
- **Setup:** See `server/GROQ_SETUP.md`

---

## Iteration 2: Text-to-Speech (TTS) Integration 🎯

### Overview
Add voice capabilities to the interview system for a more realistic interview experience.

### Phase 2.1: Speech-to-Text (STT) - User Speaks
**Goal:** Allow users to speak their answers instead of typing

#### Options:

| Provider | Free Tier | Quality | Latency | Recommendation |
|----------|-----------|---------|---------|----------------|
| **Web Speech API** | Unlimited | Good | Low | ⭐ Best for web |
| **Google Cloud STT** | 60 min/month | Excellent | Low | Good backup |
| **Azure Speech** | 500 min/month | Excellent | Low | Enterprise grade |
| **Whisper API** | Paid | Best | Medium | Highest accuracy |

#### Recommended: Web Speech API (Browser Built-in)
```javascript
// Browser-based, no API key needed
const recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  // Send transcript to interview API
};
```

**Pros:**
- Free, unlimited
- No API setup
- Works offline (basic)
- Low latency

**Cons:**
- Browser support varies
- Less accurate than cloud APIs

#### Implementation Steps:
1. Add microphone button to InterviewPage
2. Implement Web Speech API listener
3. Show live transcript as user speaks
4. Add "Stop Recording" button
5. Submit transcript as answer
6. Fallback to text input if unsupported

---

### Phase 2.2: Text-to-Speech (TTS) - AI Speaks
**Goal:** Have AI read questions and feedback aloud

#### Options:

| Provider | Free Tier | Voice Quality | Languages | Recommendation |
|----------|-----------|---------------|-----------|----------------|
| **Google Cloud TTS** | 4M chars/month | Excellent | 220+ | ⭐ Best overall |
| **ElevenLabs** | 10K chars/month | Best | 28 | Premium voices |
| **Azure Speech** | 500K chars/month | Excellent | 100+ | Enterprise |
| **Edge TTS** | Free | Good | Many | Open source |

#### Recommended: Google Cloud TTS
**Why:** Generous free tier, high quality, reliable

**Setup:**
```bash
npm install @google-cloud/text-to-speech
```

**Implementation:**
```javascript
import textToSpeech from '@google-cloud/text-to-speech';

const client = new textToSpeech.TextToSpeechClient();

async function speak(text) {
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: { languageCode: 'en-US', name: 'en-US-Standard-C' },
    audioConfig: { audioEncoding: 'MP3' },
  });
  
  // Return audio buffer or play in browser
  return response.audioContent;
}
```

**Browser Playback:**
```javascript
const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
audio.play();
```

#### Alternative: ElevenLabs (Premium)
For more natural, human-like voices:
- Free: 10,000 characters/month
- Best voice quality available
- Multiple voice options

---

### Phase 2.3: Combined Voice Interview
**Features:**
- 🎤 User speaks answers (STT)
- 🔊 AI reads questions (TTS)
- 📝 Optional text fallback
- ⚙️ User preferences for voice settings

**UI Updates:**
- Microphone toggle button
- Speaker toggle button
- Voice selection dropdown
- Speed/volume controls

---

## Iteration 3: Resume Reading & Analysis 📄

### Overview
Enable users to upload their resume for personalized interview questions.

### Technical Stack

#### File Upload
```bash
npm install multer express-fileupload
```

#### PDF Parsing
```bash
npm install pdf-parse    # For PDF files
npm install mammoth      # For DOCX files
```

#### Implementation Flow:

1. **Upload Resume** (Frontend)
```javascript
const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  
  const response = await axios.post('/api/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};
```

2. **Extract Text** (Backend)
```javascript
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs';

export const extractResumeText = async (filePath, mimeType) => {
  if (mimeType === 'application/pdf') {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }
  
  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }
  
  throw new Error('Unsupported file format');
};
```

3. **AI Analysis** (Groq)
```javascript
import { generateContent } from '../services/ai/generateContent.js';

const RESUME_ANALYSIS_PROMPT = `
Analyze this resume and extract:
1. Top 5 technical skills
2. Years of experience
3. Key projects/achievements
4. Role suitability (Junior/Mid/Senior)
5. 3 personalized interview questions based on their experience

Resume:
${resumeText}

Respond in JSON format.
`;

export const analyzeResume = async (resumeText) => {
  const analysis = await generateContent(RESUME_ANALYSIS_PROMPT);
  return analysis;
};
```

4. **Generate Personalized Questions**
```javascript
// Use resume analysis to tailor questions
export const generatePersonalizedQuestions = async (resumeAnalysis, role) => {
  const prompt = `
  Based on this candidate's background:
  - Skills: ${resumeAnalysis.skills.join(', ')}
  - Experience: ${resumeAnalysis.yearsOfExperience} years
  - Level: ${resumeAnalysis.roleSuitability}
  
  Generate 5 interview questions for a ${role} position that:
  1. Test their stated skills
  2. Challenge their experience level
  3. Explore their project experience
  `;
  
  return await generateContent(prompt);
};
```

### Resume Upload Endpoint

```javascript
// routes/resumeRoutes.js
import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { extractResumeText } from '../services/resumeParser.js';
import { analyzeResume } from '../services/ai/resumeAnalysis.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/resumes/' });

router.post('/upload', protect, upload.single('resume'), async (req, res) => {
  try {
    const { file } = req;
    
    // Extract text
    const resumeText = await extractResumeText(file.path, file.mimetype);
    
    // Analyze with AI
    const analysis = await analyzeResume(resumeText);
    
    // Store in database
    // ... save to user profile
    
    res.json({ analysis, message: 'Resume analyzed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
```

### Database Schema Updates

```javascript
// models/User.js - Add fields
const userSchema = new Schema({
  // ... existing fields
  resume: {
    filePath: String,
    extractedText: String,
    analysis: {
      skills: [String],
      yearsOfExperience: Number,
      roleSuitability: String,
      lastUpdated: Date
    }
  }
});
```

---

## Iteration 4: Analytics Dashboard 📊

### Features
- Performance trends over time
- Score breakdown by category
- Weakness identification
- Personalized study recommendations
- Comparison with other users (anonymized)

### Tech Stack
- **Charts:** Recharts or Chart.js
- **Data Aggregation:** MongoDB aggregation pipelines
- **Real-time Updates:** Socket.io (optional)

---

## Iteration 5: Desktop App (Electron) 🖥️

### Features
- Cross-platform desktop app
- Offline interview mode
- System tray integration
- Auto-updater
- Native notifications

### Setup
```bash
npm install electron electron-builder concurrently wait-on
```

---

## Summary: Next Steps

### Immediate (Iteration 2):
1. ✅ Switch to Groq AI (DONE)
2. 🔲 Add Web Speech API for voice input
3. 🔲 Add Google Cloud TTS for voice output
4. 🔲 Voice settings UI

### Mid-term (Iteration 3):
1. 🔲 Resume upload functionality
2. 🔲 PDF/DOCX parsing
3. 🔲 AI-powered resume analysis
4. 🔲 Personalized question generation

### Long-term:
1. 🔲 Analytics dashboard
2. 🔲 Desktop application
3. 🔲 Mobile app (React Native)

---

**Last Updated:** June 5, 2026  
**Current Version:** 1.5.0