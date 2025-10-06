import { useState } from "react";
import { getChatCompletion } from "../api/openrouter";
import type { SimpleChatMessage } from "../types";
import TypingIndicator from "../components/TypingIndicator";

type SimpleChatMessageWithId = SimpleChatMessage & { id: number };

export default function ChatPage() {
  const [messages, setMessages] = useState<SimpleChatMessageWithId[]>([
    { id: 0, role: "assistant", content: "Hello! How can I help you?" }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    // Prevent sending empty messages
    if (!input.trim()) return;

    const newMessages: SimpleChatMessageWithId[] = [...messages, { id: Date.now(), role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await getChatCompletion(newMessages.map((msg) => {
        const { id, ...rest } = msg;
        return { ...rest };
      }));
      setMessages([...newMessages, { id: Date.now(), role: "assistant", content: response }]);
    } catch (error) {
      setMessages([...newMessages, { id: Date.now(), role: "assistant", content: "Error: Unable to chat with AI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="p-4 shadow bg-white dark:bg-gray-800">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Chat with AI
        </h1>
      </header>

      {/* Chat Window */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] p-3 rounded-2xl text-sm sm:text-base ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
            }`}
          >
            {msg.content as string}
          </div>
        ))}
        {loading && <div><TypingIndicator /></div>}
      </main>

      {/* Input Bar */}
      <footer className="p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="text-white flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </footer>
    </div>
  );
}
