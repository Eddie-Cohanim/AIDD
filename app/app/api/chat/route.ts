import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { ChatAssistant } from "@/lib/chat-assistant";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { profileData } from "@/lib/profile";
import { MAX_CHAT_MESSAGES, MAX_INPUT_CHARS } from "@/lib/constants";

// Authentication: set ANTHROPIC_API_KEY in the Vercel project's environment variables,
// or in .env.local when running `next dev`.
export const runtime = "nodejs";

const CLIENT_ERROR_MESSAGE = "An error occurred.";
const assistant = new ChatAssistant(buildSystemPrompt(profileData));

export async function POST(request: Request): Promise<Response> {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid request body", { status: 400 });
    }

    const trimmed = messages.slice(-MAX_CHAT_MESSAGES);

    if (trimmed.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    const lastMessage = trimmed[trimmed.length - 1];
    const lastText: string =
      typeof lastMessage.content === "string"
        ? lastMessage.content
        : Array.isArray(lastMessage.parts)
          ? lastMessage.parts
              .filter((p: { type: string; text?: string }) => p.type === "text")
              .map((p: { type: string; text?: string }) => p.text ?? "")
              .join("")
          : "";

    if (lastText.length > MAX_INPUT_CHARS) {
      return new Response("Message too long", { status: 400 });
    }

    const params = ChatAssistant.toMessageParams(trimmed);

    if (params.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    const stream = createUIMessageStream({
      execute: ({ writer }) => assistant.streamReply(params, writer, request.signal),
      // Model failures happen mid-stream, after this handler has returned, so log them here.
      onError(error) {
        if (!request.signal.aborted) {
          console.error("[/api/chat] model request failed:", error);
        }
        return CLIENT_ERROR_MESSAGE;
      },
    });

    return createUIMessageStreamResponse({ stream });
  } catch (err) {
    console.error("[/api/chat]", err);
    return new Response("Internal server error", { status: 500 });
  }
}
