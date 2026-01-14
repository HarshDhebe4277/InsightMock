import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY || API_KEY.includes('your_gemini_api_key_here')) {
    console.error('CRITICAL: Gemini API Key is missing or invalid in .env file');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Generate context-aware hint based on user's code
export const generateHint = async (problemTitle, problemDescription, userCode, hintLevel = 1) => {
    const prompt = `You are an expert coding mentor helping a student solve a DSA problem.

Problem: ${problemTitle}
Description: ${problemDescription}

The student's current code:
\`\`\`
${userCode || '// No code written yet'}
\`\`\`

Hint Level: ${hintLevel} (1 = gentle nudge, 2 = more specific, 3 = detailed guidance)

CRITICAL RULES:
1. DO NOT give the complete solution or code
3. If their code is trivial (e.g. just "pass" or "print hello"), ask them to start the algorithm.
4. If they have no code, suggest what data structure or pattern to use
5. If they have partial code, point out what they're missing or what to check
5. Be encouraging and educational
6. Keep the hint to 2-3 sentences maximum

Generate a helpful hint:`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating hint:', error);
        throw new Error('Failed to connect to AI service. Please check your API Key in .env file.');
    }
};

// Generate interviewer question based on the submitted solution
export const generateInterviewQuestion = async (problemTitle, userCode, problemPattern) => {
    const prompt = `You are a technical interviewer conducting a mock coding interview.

The candidate just solved this problem: ${problemTitle}
Pattern: ${problemPattern}

Their solution:
\`\`\`
${userCode}
\`\`\`

TASK: Ask ONE intelligent follow-up question about their solution. Focus on:
- Time/space complexity analysis
- Optimization possibilities
- Edge cases they might have missed
- Trade-offs in their approach
- Alternative solutions

CRITICAL RULES:
1. Ask only ONE question
2. Be professional but friendly
3. The question should test their understanding, not trip them up
4. Keep it concise (1-2 sentences)
5. Don't ask "explain your code" - ask something specific

Generate the interview question:`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating interview question:', error);
        return 'Can you explain the time complexity of your solution and whether there\'s a way to optimize it further?';
    }
};

// Evaluate user's explanation
export const evaluateExplanation = async (question, userExplanation) => {
    const prompt = `You are a technical interviewer evaluating a candidate's explanation.

Your Question: ${question}

Candidate's Answer: ${userExplanation}

TASK: Evaluate their answer on a scale of 1-5 stars based on:
- Technical accuracy
- Clarity of communication
- Completeness
- Use of proper terminology

Provide:
1. A rating (1-5 stars)
2. Brief feedback (2-3 sentences) highlighting what was good and what could be improved

Format your response EXACTLY like this:
Rating: [X]/5
Feedback: [Your feedback here]`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse the response to extract rating and feedback
        const ratingMatch = text.match(/Rating:\s*(\d)/);
        const feedbackMatch = text.match(/Feedback:\s*(.+)/s);

        const rating = ratingMatch ? parseInt(ratingMatch[1]) : 3;
        const feedback = feedbackMatch ? feedbackMatch[1].trim() : text;

        return { rating, feedback };
    } catch (error) {
        console.error('Error evaluating explanation:', error);
        throw new Error('AI Service Error: Could not evaluate response.');
    }
};

// Generate daily challenge problem selection (for future enhancement)
export const generateDailyChallenge = async (userMasteryMap, problemHistory) => {
    // This can be enhanced later - for now returning a simple recommendation
    const weakestPattern = Object.entries(userMasteryMap)
        .sort(([, a], [, b]) => a - b)[0][0];

    return {
        focusPattern: weakestPattern,
        reasoning: `Your mastery in ${weakestPattern} is currently the lowest. Let's strengthen it!`,
    };
};

// Validate user's solution
export const validateSolution = async (problemTitle, problemDescription, userCode) => {
    const prompt = `You are a strict code judge.
    
Problem: ${problemTitle}
Description: ${problemDescription}

Student Code:
\`\`\`
${userCode}
\`\`\`

TASK: Determine if this code is a valid, logical solution to the problem. 
- Ignore minor syntax errors or missing imports.
- Focus on the ALGORITHM logic.
- If the code is trivial (e.g. "pass", "return 0", "print hello") or clearly incorrect, marked as FAILED.

Return a JSON object:
{
  "passed": boolean,
  "feedback": "string (short reason for pass/fail)",
  "failedTestCase": { "input": "string", "expected": "string", "actual": "string" } (optional, make up a simple case if failed)
}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response (handle potential markdown ticks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return { passed: false, feedback: "Could not verify solution." };
    } catch (error) {
        console.error('Error validating solution:', error);
        return { passed: false, feedback: "Error validating solution. Please try again." };
    }
};

export default {
    generateHint,
    generateInterviewQuestion,
    evaluateExplanation,
    generateDailyChallenge,
    validateSolution,
};
