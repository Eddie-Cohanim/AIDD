import Anthropic from "@anthropic-ai/sdk";
import type { UIMessage, UIMessageStreamWriter } from "ai";

// The lowest-cost current Claude model; short questions about the profile do not need more.
const CHAT_MODEL = "claude-haiku-4-5";
// Replies are meant to be short, so this caps what a single answer can cost.
const MAX_REPLY_TOKENS = 1024;
const REPLY_PART_ID = "reply";

function messageText(message: UIMessage): string {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("")
    .trim();
}

export class ChatAssistant {
  private readonly client = new Anthropic();

  constructor(private readonly systemPrompt: string) {}

  // Keeps the text of user and assistant turns, starting at the first user turn as the API requires.
  static toMessageParams(messages: UIMessage[]): Anthropic.MessageParam[] {
    const params: Anthropic.MessageParam[] = [];
    for (const message of messages) {
      if (message.role !== "user" && message.role !== "assistant") continue;
      if (params.length === 0 && message.role !== "user") continue;
      const text = messageText(message);
      if (text) params.push({ role: message.role, content: text });
    }
    return params;
  }

  // Streams Claude's reply into the chat widget's message stream as a single text part.
  async streamReply(
    messages: Anthropic.MessageParam[],
    writer: UIMessageStreamWriter,
    signal: AbortSignal
  ): Promise<void> {
    const stream = this.client.messages.stream(
      {
        model: CHAT_MODEL,
        max_tokens: MAX_REPLY_TOKENS,
        system: this.systemPrompt,
        messages,
      },
      // Stops generation, and billing, when the visitor closes the chat mid-reply.
      { signal }
    );

    writer.write({ type: "text-start", id: REPLY_PART_ID });
    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        writer.write({ type: "text-delta", id: REPLY_PART_ID, delta: event.delta.text });
      }
    }
    writer.write({ type: "text-end", id: REPLY_PART_ID });
  }
}
