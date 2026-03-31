import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const CAREER_SYSTEM_PROMPT = `You are Myway's AI career coach — expert in career development, job searching, resume writing, interview preparation, and professional growth. You help students, graduates, and professionals in Africa and globally.

Your personality:
- Warm, encouraging, and practical
- Give specific, actionable advice (not vague tips)
- Ask clarifying questions when needed
- Reference the user's profile/context when available
- Keep responses focused and concise

You can help with:
- Career path planning and advice
- Resume and cover letter review
- Interview preparation and mock questions
- Job search strategy
- Skills gap analysis
- Salary negotiation tips
- Industry insights`;

export async function askCareerCoach(message: string, persona: string, history: any[]) {
  const response = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    system: `${CAREER_SYSTEM_PROMPT}\n\nThe user's career persona is: ${persona}. Tailor all advice to this archetype.`,
    messages: [
      ...history,
      { role: "user", content: message }
    ],
  });

  // Handle the content properly (Claude 3 returns an array of content blocks)
  const textBlock = response.content.find(block => block.type === 'text');
  return textBlock ? textBlock.text : "I'm sorry, I couldn't generate a response.";
}
