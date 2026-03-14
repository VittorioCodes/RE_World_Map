import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: "Search for 'Resident Evil 9 Requiem' or 'Resident Evil 9 leaks'. What is the rumored lore, location, and characters for Resident Evil 9? Is it called Requiem? Where does it take place? Please provide a summary.",
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    console.log(response.text);
  } catch (e) {
    console.error(e);
  }
}

run();
