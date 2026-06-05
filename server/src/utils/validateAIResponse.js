/**
 * Validates the structure of AI responses
 * Ensures required fields are present and have correct types
 */

/**
 * Validates a question/feedback response structure
 * @param {object} response - Response to validate
 * @throws {Error} If validation fails
 */
export const validateQuestionResponse = (response) => {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid response: expected an object');
  }

  if (typeof response.feedback !== 'string' || !response.feedback.trim()) {
    throw new Error('Invalid response: missing or empty "feedback" field');
  }

  if (typeof response.nextQuestion !== 'string' || !response.nextQuestion.trim()) {
    throw new Error('Invalid response: missing or empty "nextQuestion" field');
  }
};

/**
 * Validates the final evaluation response structure
 * @param {object} response - Response to validate
 * @throws {Error} If validation fails
 */
export const validateEvaluationResponse = (response) => {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid response: expected an object');
  }

  if (typeof response.overallAssessment !== 'string' || !response.overallAssessment.trim()) {
    throw new Error('Invalid response: missing or empty "overallAssessment" field');
  }

  if (!Array.isArray(response.strengths)) {
    throw new Error('Invalid response: "strengths" must be an array');
  }

  if (!Array.isArray(response.areasForImprovement)) {
    throw new Error('Invalid response: "areasForImprovement" must be an array');
  }

  if (typeof response.score !== 'number' || response.score < 0 || response.score > 100) {
    throw new Error('Invalid response: "score" must be a number between 0 and 100');
  }
};