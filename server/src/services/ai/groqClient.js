import Groq from 'groq-sdk';

let groqClient = null;

/**
 * Gets or creates the Groq client instance
 * @returns {Groq} Groq client instance
 */
export const getGroqClient = () => {
  if (!groqClient) {
    groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groqClient;
};

/**
 * Gets the model name being used
 * @returns {string} Model name
 */
export const getInterviewModelName = () => {
  return process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
};

/**
 * Gets the API key
 * @returns {string} API key
 */
export const getApiKey = () => {
  return process.env.GROQ_API_KEY;
};