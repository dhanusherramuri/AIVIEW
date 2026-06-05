// Default model name
const DEFAULT_MODEL = 'gemini-2.0-flash';

/**
 * Gets the model name being used
 * @returns {string} Model name
 */
export const getInterviewModelName = () => {
  return process.env.GEMINI_MODEL || DEFAULT_MODEL;
};

/**
 * Gets the API key
 * @returns {string} API key
 */
export const getApiKey = () => {
  return process.env.GEMINI_API_KEY;
};