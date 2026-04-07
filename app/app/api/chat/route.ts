import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { profileData } from "@/lib/profile";
import { MAX_CHAT_MESSAGES, MAX_INPUT_CHARS } from "@/lib/constants";

// Authentication: requires GOOGLE_GENERATIVE_AI_API_KEY in .env.local (local)
// and in Vercel environment variables (production).
// Free tier: https://aistudio.google.com/apikey
//
// To revert to Vercel AI Gateway (Anthropic):
// - Remove @ai-sdk/google import, restore: import { anthropic } from "@ai-sdk/google"  (wrong)
//   actually use model string "anthropic/claude-3-haiku" directly (no provider import needed)
//   and replace google("gemini-2.0-flash") with "anthropic/claude-3-haiku"
export const runtime = "nodejs";

const GOOGLE_MODEL = "gemini-2.0-flash";

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
      model: google(GOOGLE_MODEL),
      system: systemPrompt,
      messages: trimmed,
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
