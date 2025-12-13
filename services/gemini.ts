import { GoogleGenAI } from "@google/genai";

export const generateSiteDescription = async (siteName: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY not found in environment variables");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using a lighter model for quick descriptions
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a concise, engaging travel summary for the World Heritage Site "${siteName}" in China. Limit to 3 sentences. Focus on why it is unique and worth visiting.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Speed over deep reasoning for simple summaries
      }
    });

    return response.text || "No description available at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not load AI insight. Please try again later.";
  }
};
