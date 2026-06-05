/**
 * Builds the prompt for processing a candidate's answer and generating feedback
 * @param {string} role - The role being interviewed for
 * @param {string} difficulty - The difficulty level
 * @param {Array} history - Array of conversation messages
 * @param {string} candidateAnswer - The candidate's latest answer
 * @returns {string} Complete prompt for generating feedback and next question
 */
export const buildFeedbackPrompt = (role, difficulty, history, candidateAnswer) => {
  const systemPrompt = buildSystemPrompt();

  // Build conversation context (keep it small - last 4 exchanges max)
  const recentHistory = history.slice(-4);
  const historyText = recentHistory.map(msg =>
    `${msg.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${msg.content}`
  ).join('\n');

  return `${systemPrompt}

Role: ${role}
Difficulty: ${difficulty}

Conversation History:
${historyText}

Candidate's Latest Answer:
${candidateAnswer}

Provide brief feedback and ask the next relevant question.

Respond in JSON format:
{
  "feedback": "Your evaluation of the candidate's answer (1-2 sentences)",
  "nextQuestion": "Your next interview question"
}`;
};

/**
 * Builds the system prompt for the interviewer persona
 * @returns {string} System prompt for interviewer
 */
const buildSystemPrompt = () => {
  return `You are a professional technical interviewer conducting a job interview. 
Your role is to:
1. Ask one clear, focused question at a time
2. Evaluate the candidate's answer concisely
3. Provide brief, constructive feedback
4. Ask follow-up questions based on their response
5. Keep questions appropriate to the difficulty level

Difficulty levels:
- Easy: Basic concepts, definitions, simple scenarios
- Medium: Problem-solving, moderate complexity, practical applications
- Hard: Advanced concepts, system design, complex scenarios

Always respond in valid JSON format as specified in the prompts.`;
};