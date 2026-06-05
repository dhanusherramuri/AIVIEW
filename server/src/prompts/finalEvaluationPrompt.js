/**
 * Builds the prompt for generating final interview evaluation
 * @param {string} role - The role being interviewed for
 * @param {string} difficulty - The difficulty level
 * @param {Array} history - Complete conversation history
 * @returns {string} Complete prompt for generating final evaluation
 */
export const buildFinalEvaluationPrompt = (role, difficulty, history) => {
  const systemPrompt = buildSystemPrompt();

  const historyText = history.map(msg =>
    `${msg.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${msg.content}`
  ).join('\n');

  return `${systemPrompt}

Role: ${role}
Difficulty: ${difficulty}

Complete Interview Conversation:
${historyText}

Provide a final evaluation summary with:
1. Overall performance assessment
2. Key strengths demonstrated
3. Areas for improvement
4. Final score out of 100

Respond in JSON format:
{
  "overallAssessment": "Overall performance summary (2-3 sentences)",
  "strengths": ["strength1", "strength2", "strength3"],
  "areasForImprovement": ["area1", "area2", "area3"],
  "score": 85
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