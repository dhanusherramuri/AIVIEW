import { generateContent } from './generateContent.js';
import { getInterviewModelName } from './geminiClient.js';
import { buildFeedbackPrompt } from '../../prompts/feedbackPrompt.js';
import { retryAsync } from '../../utils/retryAsync.js';
import { validateQuestionResponse } from '../../utils/validateAIResponse.js';
import logger from '../../utils/logger.js';
import { processMockAnswer } from './mockAiService.js';

/**
 * Processes a candidate's answer and generates feedback with next question
 * @param {Array} conversationHistory - Array of conversation messages
 * @param {string} candidateAnswer - Candidate's latest answer
 * @param {string} role - Role being interviewed for
 * @param {string} difficulty - Difficulty level
 * @returns {Promise<object>} Object with feedback and nextQuestion
 */
export const processAnswer = async (conversationHistory, candidateAnswer, role, difficulty) => {
  try {
    const useMock = process.env.USE_MOCK_AI === 'true';
    
    if (useMock) {
      logger.info('Using mock AI service for development');
      return await processMockAnswer(conversationHistory, candidateAnswer, role, difficulty);
    }

    const modelName = getInterviewModelName();
    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = buildFeedbackPrompt(role, difficulty, conversationHistory, candidateAnswer);

    logger.info(`Processing answer for ${role} - ${difficulty}`);

    const response = await retryAsync(() => generateContent(modelName, apiKey, prompt));
    
    validateQuestionResponse(response);

    logger.info('Answer processed successfully');

    return response;
  } catch (error) {
    logger.error('Failed to process answer', { role, difficulty, error: error.message });
    
    if (error.message.includes('429') || error.message.includes('quota')) {
      logger.warn('API quota exceeded, falling back to mock AI');
      return await processMockAnswer(conversationHistory, candidateAnswer, role, difficulty);
    }
    
    throw new Error('Unable to process answer. Please try again.');
  }
};