import { parseGeminiResponse } from '../../utils/parseGeminiResponse.js';
import logger from '../../utils/logger.js';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Generates content using Gemini AI via direct API call
 * This bypasses the SDK to support AQ. format API keys
 * @param {string} modelName - Model name (e.g., gemini-2.0-flash)
 * @param {string} apiKey - Gemini API key
 * @param {string} prompt - Prompt to send to the model
 * @returns {Promise<object>} Parsed JSON response
 */
export const generateContent = async (modelName, apiKey, prompt) => {
  const url = `${GEMINI_API_URL}/${modelName}:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    logger.error('Gemini API error', { 
      status: response.status, 
      statusText: response.statusText,
      details: errorData 
    });
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    throw new Error('Invalid response format from Gemini API');
  }
  
  const text = data.candidates[0].content.parts[0].text;
  return parseGeminiResponse(text);
};