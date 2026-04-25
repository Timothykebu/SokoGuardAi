import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getSokoAdvice(location: string, item: string, question: string) {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
System: You are SokoGuard AI, a street-smart Kenyan market expert.
Context: A trader/farmer in ${location} is dealing with ${item}.
User Concern: "${question}"

Your Goal: Protect the user from being underpaid/exploited. 
Tone: Confident, empathetic, and uses natural Sheng/Swahili mix.

Requirements:
- Give a specific price range in KES.
- Reference markets like Gikomba, Muthurwa, Wakulima, or Kongowea if relevant.
- If underpaid, call it out (e.g., "Hiyo ni robbery", "Brokers wanakucheza").
- Focus on practical, actionable advice.
- Keep the response concise but impactful.
- Use bold text for key prices and warnings.
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [{ text: `I am in ${location} selling/buying ${item}. My concern is: ${question}` }]
        }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error: any) {
    if (error?.message?.includes("429") || error?.status === "RESOURCE_EXHAUSTED" || error?.message?.includes("quota")) {
      throw new Error("QUOTA_EXCEEDED");
    }
    console.error("Gemini API Error:", error);
    throw error;
  }
}
