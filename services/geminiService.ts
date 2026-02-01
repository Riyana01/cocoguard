
import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../types";

export const analyzeCoconutPest = async (base64Image: string, language: Language) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are an expert tropical agronomist specialized in South Indian coconut farming (Tiruchengode region).
    Analyze this image of a coconut tree part. 
    1. Identify the specific pest or disease.
    2. List symptoms shown in the image.
    3. Explain the environmental or management causes.
    4. Provide specific chemical and organic treatments suitable for Indian farmers.
    5. List prevention steps.
    
    Response must be in JSON format.
    Output language: ${language === 'ta' ? 'Tamil' : 'English'}.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          { text: prompt },
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          pestName: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
          causes: { type: Type.STRING },
          treatmentChemical: { type: Type.STRING },
          treatmentOrganic: { type: Type.STRING },
          dosage: { type: Type.STRING },
          prevention: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["pestName", "confidence", "symptoms", "causes", "treatmentChemical", "treatmentOrganic", "prevention"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
