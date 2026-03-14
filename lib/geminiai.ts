import { GoogleGenerativeAI } from '@google/generative-ai';
import { SUMMARY_SYSTEM_PROMPT } from '@/lib/prompt';

export async function generateSummaryFromGemini(pdfText: string){
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  try {
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_API_MODEL || 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 3000,
      },
    });

    const prompt = {
      contents: [
        {
          role: 'user',
          parts: 
          [
            { text: SUMMARY_SYSTEM_PROMPT },
            { text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,},
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);
    const response = result.response;
    if(!response.text) {
      throw new Error("Empty Response from Gemini API");
    }
    return response.text();
  } 
  catch (error: any) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};
