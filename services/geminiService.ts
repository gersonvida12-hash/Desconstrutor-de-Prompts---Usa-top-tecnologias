// Fix: Import GoogleGenAI and Type from @google/genai
import { GoogleGenAI, Type } from "@google/genai";
// Fix: Import AnalysisResult type
import { AnalysisResult } from '../types';

// Per instructions, API key is assumed to be in process.env.API_KEY
// Fix: Initialize GoogleGenAI with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

// Fix: Define the JSON schema for the expected response from the Gemini API.
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "Um resumo geral da estratégia e eficácia do prompt.",
    },
    techniques: {
      type: Type.ARRAY,
      description: "Uma lista de técnicas de engenharia de prompt encontradas no prompt.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "O nome da técnica de engenharia de prompt.",
          },
          description: {
            type: Type.STRING,
            description: "Uma breve explicação da técnica e como ela é usada no prompt.",
          },
          example: {
            type: Type.STRING,
            description: "Uma citação direta ou exemplo do prompt que ilustra a técnica.",
          },
        },
        required: ["title", "description", "example"],
      },
    },
  },
  required: ["summary", "techniques"],
};

// Fix: Implement the analyzePrompt function to call the Gemini API.
export const analyzePrompt = async (prompt: string): Promise<AnalysisResult> => {
  try {
    const systemInstruction = `Você é um especialista em engenharia de prompts. Sua tarefa é analisar um prompt enviado por um usuário e desconstruí-lo nas técnicas de engenharia de prompts que ele utiliza.

    Instruções:
    1.  Analise cuidadosamente o prompt fornecido (o conteúdo do usuário).
    2.  Identifique todas as técnicas de engenharia de prompts discerníveis (por exemplo, Persona, Zero-shot, Few-shot, Chain of Thought, Delimitadores, Formato de Saída, etc.).
    3.  Para cada técnica, forneça um 'título' conciso, uma 'descrição' de como a técnica está sendo aplicada no prompt e um 'exemplo' específico do prompt.
    4.  Escreva um 'resumo' geral da estratégia do prompt e sua provável eficácia.
    5.  Responda SEMPRE em português brasileiro.
    6.  Sua resposta DEVE estar estritamente no formato JSON, aderindo ao esquema fornecido. Não inclua markdown (ou seja, \`\`\`json) ou quaisquer outros caracteres antes ou depois do JSON.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    // Fix: Directly access the 'text' property for the response, as per guidelines.
    const jsonText = response.text;
    const result = JSON.parse(jsonText);
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing prompt with Gemini API:", error);
    let errorMessage = "An unknown error occurred while analyzing the prompt.";
    if (error instanceof Error) {
        errorMessage = `Failed to analyze prompt. Gemini API error: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
};
