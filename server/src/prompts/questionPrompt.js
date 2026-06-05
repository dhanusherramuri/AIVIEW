/**
 * Builds the system prompt for the interviewer persona
 * @returns {string} System prompt for interviewer
 */
export const buildSystemPrompt = () => {
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

/**
 * Builds the prompt for generating the first interview question
 * @param {string} role - The role being interviewed for (e.g., MERN, Frontend)
 * @param {string} difficulty - The difficulty level (Easy, Medium, Hard)
 * @returns {string} Complete prompt for generating first question
 */
export const buildQuestionPrompt = (role, difficulty) => {
  const systemPrompt = buildSystemPrompt();

  return `${systemPrompt}

Role: ${role}
Difficulty: ${difficulty}

Generate an opening interview question for a ${difficulty} level ${role} developer position.
Ask only the first question. Do not provide feedback yet.

Respond in JSON format:
{
  "feedback": "Welcome message",
  "nextQuestion": "Your opening question"
}`;
};