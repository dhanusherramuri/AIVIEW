import { getGroqClient, getInterviewModelName } from './groqClient.js';
import { parseGeminiResponse } from '../../utils/parseGeminiResponse.js';
import logger from '../../utils/logger.js';

/**
 * Generates content using Groq AI
 * @param {string} prompt - Prompt to send to the model
 * @returns {Promise<object>} Parsed JSON response
 */
export const generateContent = async (prompt) => {
  const client = getGroqClient();
  const modelName = getInterviewModelName();

  const response = await client.chat.completions.create({
    model: modelName,
    messages: [
      {
        role: 'system',
        content: 'You are an expert technical interviewer. Always respond with valid JSON only, no markdown formatting.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 0.95,
  });

  const text = response.choices[0]?.message?.content || '';
  
  if (!text) {
    throw new Error('Empty response from Groq API');
  }

  logger.info('Groq API response received', { 
    model: modelName, 
    tokens_used: response.usage?.total_tokens 
  });

  return parseGeminiResponse(text);
};