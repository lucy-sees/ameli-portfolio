import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY ?? "";

if (!apiKey && process.env.NODE_ENV === "production") {
  console.warn("[GeminiClient] GEMINI_API_KEY is not set.");
}

export const genAI = new GoogleGenerativeAI(apiKey);

export const geminiFlash = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.4,
    maxOutputTokens: 512,
  },
});
