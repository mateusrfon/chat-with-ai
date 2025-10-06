import OpenAI from "openai";
import type { SimpleChatMessage } from "../types";

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  // WARNING: This is insecure and should only be used for testing purposes
  // On an app in production, you should never expose your API key to the browser
  // It should be handled by a backend server
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
    'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
  },
});

export async function getChatCompletion(messages: SimpleChatMessage[]) {
    try {
        const response = await openai.chat.completions.create({
            model: "deepseek/deepseek-chat-v3.1:free", // You can use any model from openrouter.ai
            messages: messages,
        });

        return response.choices[0].message.content;
    } catch {
        throw new Error("Failed to connect with AI provider.");
    }
}

