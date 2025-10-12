import type { SimpleChatMessage } from "../types";

export async function postChatMessage(
  messages: SimpleChatMessage[]
): Promise<string> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    return data.message;
  } catch {
    throw new Error("Error posting chat message");
  }
}
