
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDrillSuggestions = async (theme: string, category: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Você é um treinador de futsal de elite especializado na categoria Sub-18. 
    Gere uma lista de 3 exercícios altamente detalhados e profissionais para o tema "${theme}" na categoria "${category}".
    Cada exercício deve incluir:
    1. Um título criativo.
    2. Uma descrição passo-a-passo completa (objetivo, organização, execução e variações).
    3. Duração sugerida.
    4. Intensidade.
    5. Uma "videoUrl" que seja uma frase curta e precisa em inglês para busca no YouTube (ex: "futsal 3v2 counter attack drills").
    Retorne estritamente em JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            duration: { type: Type.NUMBER },
            intensity: { type: Type.STRING, enum: ["Baixa", "Média", "Alta"] },
            category: { type: Type.STRING },
            videoUrl: { type: Type.STRING, description: "Termos precisos para busca de vídeo no YouTube" }
          },
          required: ["title", "description", "duration", "intensity", "category", "videoUrl"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
};
