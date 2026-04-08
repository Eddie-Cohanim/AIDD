import { streamText, convertToCoreMessages } from "ai";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { profileData } from "@/lib/profile";
import { MAX_CHAT_MESSAGES, MAX_INPUT_CHARS } from "@/lib/constants";

// Authentication:
// - Production: Vercel automatically injects VERCEL_OIDC_TOKEN for AI Gateway
// - Local with `vc dev`: Automatically injects VERCEL_OIDC_TOKEN
// - Local with `next dev`: Run `vc env pull` first to pull VERCEL_OIDC_TOKEN into .env.local
export const runtime = "nodejs";

const ANTHROPIC_MODEL = "anthropic/claude-3-haiku";

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

    const systemPrompt = buildSystemPrompt(profileData);

    const result = streamText({
      model: ANTHROPIC_MODEL,
      system: systemPrompt,
      messages: convertToCoreMessages(trimmed),
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("[/api/chat]", err);
    return new Response("Internal server error", { status: 500 });
  }
}
