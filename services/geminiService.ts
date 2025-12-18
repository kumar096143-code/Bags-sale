
import { GoogleGenAI } from "@google/genai";
import { Message, Product } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStylingAdvice = async (history: Message[], products: Product[]) => {
  const productList = products.map(p => `${p.name} (${p.category}, $${p.salePrice || p.price})`).join(', ');
  
  const systemInstruction = `
    You are 'Luna', an elite fashion stylist for LuxeBag. 
    You are helpful, chic, and sophisticated.
    Our current inventory includes: ${productList}.
    Provide brief, encouraging styling tips. 
    If a user asks for a recommendation, pick one or two products from the list that fit their needs.
    Always use Markdown for formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // The GenerateContentResponse object features a text property (not a method)
    return response.text || "I'm having trouble thinking of a style right now. Try again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Luna is taking a short break. Please try again in a moment!";
  }
};

export const getSmartDescription = async (product: Product) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a 2-sentence luxury marketing description for the ${product.name} bag. Mention it is part of a special sale.`,
    });
    return response.text;
  } catch (error) {
    return product.description;
  }
};
