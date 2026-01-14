import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// Initialize Groq Chat Model
const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
    console.error("GROQ_API_KEY is missing in .env");
}

const model = new ChatGroq({
    apiKey: apiKey,
    model: "openai/gpt-oss-120b",
    temperature: 0.5
});

/**
 * Generate context-aware hint based on user's code
 */
export const generateHint = async (problemTitle, problemDescription, userCode, hintLevel = 1) => {
    const systemPrompt = `You are an expert coding mentor helping a student solve a DSA problem.
    
Problem: ${problemTitle}
Description: ${problemDescription}

Hint Level: ${hintLevel} (1 = gentle nudge, 2 = more specific, 3 = detailed guidance)

CRITICAL RULES:
1. DO NOT give the complete solution.
2. If code is empty, suggest a starting point.
3. Keep it brief (2-3 sentences).
`;

    const userMessage = `My Code:\n\`\`\`\n${userCode || '// No code'}\n\`\`\`\n\nGive me a hint.`;

    try {
        const response = await model.invoke([
            new SystemMessage(systemPrompt),
            new HumanMessage(userMessage),
        ]);
        return response.content;
    } catch (error) {
        console.error("Groq generateHint error:", error);
        return "Could not generate hint at this time.";
    }
};

/**
 * Start or Continue the Interview Conversation
 * This function handles the entire turn: User Answer -> AI Analysis -> New Question OR Final Score.
 */
export const processInterviewTurn = async (currentHistory, problemTitle, userCode) => {
    // currentHistory is Array of { role: 'ai' | 'user', content: string }

    const systemPrompt = `You are a world-class Technical Interviewer from FAANG.
    
Context:
The candidate has solved the problem: "${problemTitle}".
Their Code:
\`\`\`
${userCode}
\`\`\`

GOAL:
Conduct a rigorous but friendly post-mortem interview.
1. Dig into Time/Space complexity.
2. Ask about edge cases.
3. If their explanation is weak, ask them to clarify.
4. If their explanation is great, move to a harder follow-up or finalize the interview.

RULES:
- Limit the conversation to 3-4 turns max.
- If you have enough info to rate them, OR if you have asked 3 questions already, output the FINAL SCORE.
- Otherwise, ask the NEXT QUESTION.

OUTPUT FORMAT (Choose ONE):

Option A (Continue Interview):
TYPE: QUESTION
CONTENT: [Your next specific question]

Option B (End Interview):
TYPE: FINAL_FEEDBACK
RATING: [1-5]
FEEDBACK: [Summary of their performance]
`;

    // Convert history to LangChain format
    const messages = [
        new SystemMessage(systemPrompt),
        ...currentHistory.map(msg =>
            msg.role === 'ai' ? new SystemMessage(msg.content) : new HumanMessage(msg.content)
        )
    ];

    try {
        const response = await model.invoke(messages);
        const text = response.content;

        // Naive parsing logic
        if (text.includes("TYPE: FINAL_FEEDBACK")) {
            const ratingMatch = text.match(/RATING:\s*(\d)/);
            const feedbackMatch = text.match(/FEEDBACK:\s*(.+)/s);
            // Fallback parsing
            let feedback = "Great job!";
            if (feedbackMatch) feedback = feedbackMatch[1].trim();
            else if (text.includes("FEEDBACK:")) feedback = text.split("FEEDBACK:")[1].trim();
            else feedback = text.replace("TYPE: FINAL_FEEDBACK", "").trim();

            return {
                type: 'feedback',
                rating: ratingMatch ? parseInt(ratingMatch[1]) : 3,
                content: feedback
            };
        } else {
            // It's a question or generic text
            // Clean up "TYPE: QUESTION" from the text if present
            let cleanContent = text.replace(/TYPE:\s*QUESTION\s*/i, '').trim();
            // Remove "Option A..." fluff if model hallucinates it
            cleanContent = cleanContent.replace(/Option A.*CONTENT:/i, '').trim();

            return {
                type: 'question',
                content: cleanContent
            };
        }
    } catch (error) {
        console.error("Groq Interview Error:", error);
        return { type: 'question', content: "Could you explain the complexity of your solution?" };
    }
};

/**
 * Generate interviewer question based on solution (Wrapper for compatibility)
 */
export const generateInterviewQuestion = async (problemTitle, userCode, problemPattern) => {
    // Wrapper for legacy call - starts a fresh interview
    const result = await processInterviewTurn([], problemTitle, userCode);
    return result.content;
};

/**
 * Evaluate user's explanation (Wrapper for compatibility)
 */
export const evaluateExplanation = async (question, userExplanation) => {
    // Return a special flag that tells UI to switch to new method.
    return { rating: 3, feedback: "Please update UI to use processInterviewTurn" };
};

/**
 * (Legacy/Unused) Validate Code Logic
 */
export const validateSolution = async (problemTitle, problemDescription, userCode) => {
    return { passed: true, feedback: "Validation is now handled by the Execution Engine." };
};

/**
 * Generate a conceptual explanation using real-world analogies.
 * STRICTLY NO CODE OR HINTS.
 */
export const explainProblem = async (problemTitle, problemDescription) => {
    const systemPrompt = `You are a world-class Computer Science Professor who excels at explaining complex concepts using simple, real-world analogies.

    Problem: ${problemTitle}
    Description: ${problemDescription}

    TASK:
    - Explain the core concept of this problem using a real-world analogy (e.g., "Imagine you are organizing books on a shelf...").
    - Visualize the logic purely conceptually.
    - explain the examples provided in the description and how they map to the analogy.
    
    CRITICAL RESTRICTIONS:
    - DO NOT write any code (Python, C++, Java, etc.).
    - DO NOT mention specific data structures like HashMaps, Linked Lists, or DP arrays yet.
    - DO NOT give the solution algorithm.
    - Keep it engaging and visual.
    `;

    try {
        const response = await model.invoke([
            new SystemMessage(systemPrompt),
            new HumanMessage("Explain this problem to me like I'm 12 years old."),
        ]);
        return response.content;
    } catch (error) {
        console.error("Groq explainProblem error:", error);
        return "Could not generate explanation at this time.";
    }
};

export default {
    generateHint,
    processInterviewTurn,
    generateInterviewQuestion,
    evaluateExplanation,
    validateSolution,
    explainProblem // Added new function
};
