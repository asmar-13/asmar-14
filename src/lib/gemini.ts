import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function getChatResponse(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[]) {
  if (!ai) {
    throw new Error("Gemini API key is not configured. Please add GEMINI_API_KEY to your environment variables.");
  }

  const model = "gemini-3-flash-preview";
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: "You are a helpful FAQ chatbot. Answer questions concisely and accurately. If you don't know the answer, say so politely. Use markdown for formatting.",
    },
    history,
  });

  const result = await chat.sendMessage({ message });
  return result.text;
}
