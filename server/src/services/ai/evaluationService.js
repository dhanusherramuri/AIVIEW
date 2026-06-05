import { generateContent } from './generateContent.js';
import { getInterviewModelName } from './geminiClient.js';
import { buildFinalEvaluationPrompt } from '../../prompts/finalEvaluationPrompt.js';
import { retryAsync } from '../../utils/retryAsync.js';
import { validateEvaluationResponse } from '../../utils/validateAIResponse.js';
import logger from '../../utils/logger.js';
import { generateMockFinalEvaluation } from './mockAiService.js';

/**
 * Generates final evaluation for a completed interview
 * @param {Array} conversationHistory - Complete conversation history
 * @param {string} role - Role being interviewed for
 * @param {string} difficulty - Difficulty level
 * @returns {Promise<object>} Evaluation object with assessment, strengths, areas, and score
 */
export const generateFinalEvaluation = async (conversationHistory, role, difficulty) => {
  try {
    const useMock = process.env.USE_MOCK_AI === 'true';
    
    if (useMock) {
      logger.info('Using mock AI service for development');
      return await generateMockFinalEvaluation(conversationHistory, role, difficulty);
    }

    const modelName = getInterviewModelName();
    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = buildFinalEvaluationPrompt(role, difficulty, conversationHistory);

    logger.info(`Generating final evaluation for ${role} - ${difficulty}`);

    const response = await retryAsync(() => generateContent(modelName, apiKey, prompt));
    
    validateEvaluationResponse(response);

    logger.info('Final evaluation generated successfully');

    return response;
  } catch (error) {
    logger.error('Failed to generate final evaluation', { role, difficulty, error: error.message });
    
    if (error.message.includes('429') || error.message.includes('quota')) {
      logger.warn('API quota exceeded, falling back to mock AI');
      return await generateMockFinalEvaluation(conversationHistory, role, difficulty);
    }
    
    throw new Error('Unable to generate final evaluation. Please try again.');
  }
};