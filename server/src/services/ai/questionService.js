import { generateContent } from './generateContent.js';
import { getInterviewModelName } from './geminiClient.js';
import { buildQuestionPrompt } from '../../prompts/questionPrompt.js';
import { retryAsync } from '../../utils/retryAsync.js';
import { validateQuestionResponse } from '../../utils/validateAIResponse.js';
import logger from '../../utils/logger.js';
import { generateMockFirstQuestion } from './mockAiService.js';

/**
 * Generates the first interview question
 * @param {string} role - Role being interviewed for
 * @param {string} difficulty - Difficulty level
 * @returns {Promise<object>} Object with feedback and nextQuestion
 */
export const generateFirstQuestion = async (role, difficulty) => {
  try {
    const useMock = process.env.USE_MOCK_AI === 'true';
    
    if (useMock) {
      logger.info('Using mock AI service for development');
      return await generateMockFirstQuestion(role, difficulty);
    }

    const modelName = getInterviewModelName();
    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = buildQuestionPrompt(role, difficulty);

    logger.info(`Generating first question for ${role} - ${difficulty}`);

    const response = await retryAsync(() => generateContent(modelName, apiKey, prompt));
    
    validateQuestionResponse(response);

    logger.info('First question generated successfully');

    return response;
  } catch (error) {
    logger.error('Failed to generate first question', { role, difficulty, error: error.message });
    
    if (error.message.includes('429') || error.message.includes('quota')) {
      logger.warn('API quota exceeded, falling back to mock AI');
      return await generateMockFirstQuestion(role, difficulty);
    }
    
    throw new Error('Unable to generate interview question. Please try again.');
  }
};