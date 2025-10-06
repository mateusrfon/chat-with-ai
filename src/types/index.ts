import type { ChatCompletionMessageParam } from "openai/resources";

export type SimpleChatMessage =
  Extract<
    ChatCompletionMessageParam,
    { role: "system" | "user" | "assistant" }
  >;