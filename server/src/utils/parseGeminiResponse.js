/**
 * Parses raw text response from Gemini AI into JSON
 * Handles various response formats:
 * - Raw JSON: { ... }
 * - Markdown wrapped: ```json { ... } ```
 * - Extra whitespace
 * 
 * @param {string} text - Raw text response from Gemini
 * @returns {object} Parsed JSON object
 * @throws {Error} If response cannot be parsed as JSON
 */
export const parseGeminiResponse = (text) => {
  if (!text || typeof text !== 'string') {
    throw new Error('Invalid response format: empty or non-string response');
  }

  try {
    // First, try to parse as-is (handles raw JSON)
    return JSON.parse(text.trim());
  } catch (e) {
    // If that fails, try to extract JSON from markdown
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Invalid response format: no JSON object found in response');
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      throw new Error('Invalid response format: unable to parse JSON from response');
    }
  }
};