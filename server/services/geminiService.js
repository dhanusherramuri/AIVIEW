// Re-export all AI services for backward compatibility
// New code should import from individual service files

export { generateFirstQuestion } from '../src/services/ai/questionService.js';
export { processAnswer } from '../src/services/ai/feedbackService.js';
export { generateFinalEvaluation } from '../src/services/ai/evaluationService.js';