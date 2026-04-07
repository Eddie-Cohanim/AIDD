import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { profileData } from "@/lib/profile";
import { MAX_CHAT_MESSAGES, MAX_INPUT_CHARS } from "@/lib/constants";

export const runtime = "nodejs";

const ANTHROPIC_MODEL = "claude-sonnet-4-6";
const MAX_TOKENS_PER_RESPONSE = 1024;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body: ChatRequestBody = await request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response("Invalid request body", { status: 400 });
    }

    const trimmed = body.messages.slice(-MAX_CHAT_MESSAGES);

    if (trimmed.length === 0 || trimmed[trimmed.length - 1].role !== "user") {
      return new Response("Last message must be from user", { status: 400 });
    }

    const lastMessage = trimmed[trimmed.length - 1];
    if (lastMessage.content.length > MAX_INPUT_CHARS) {
      trimmed[trimmed.length - 1] = {
        ...lastMessage,
        content: lastMessage.content.slice(0, MAX_INPUT_CHARS),
      };
    }

    const systemPrompt = buildSystemPrompt(profileData);
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const stream = client.messages.stream({
      model: ANTHROPIC_MODEL,
      max_tokens: MAX_TOKENS_PER_RESPONSE,
      system: systemPrompt,
      messages: trimmed,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      return new Response("AI service error", { status: error.status });
    }
    return new Response("Internal server error", { status: 500 });
  }
}
