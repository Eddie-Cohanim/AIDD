"use client";

import { memo, useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";
import { MAX_INPUT_CHARS } from "@/lib/constants";
import { FOCUS_RING } from "@/lib/styles";

const AVATAR_SIZE_HEADER = 40;
const AVATAR_SIZE_MESSAGE = 36;

const DOT_DELAY_MS_1 = 0;
const DOT_DELAY_MS_2 = 150;
const DOT_DELAY_MS_3 = 300;
const CHAR_WARN_THRESHOLD = 0.9;
const SCROLL_BEHAVIOR = "smooth" as const;
const BOLD_PATTERN = /\*\*(.+?)\*\*/g;
const BULLET_PREFIX = "- ";

interface ChatProps {
  onClose: () => void;
}

type TextPart = { type: "text"; text: string };
type MessagePart = TextPart | { type: string; [key: string]: unknown };

function isTextPart(part: MessagePart): part is TextPart {
  return part.type === "text" && typeof (part as TextPart).text === "string";
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];
  let keyCounter = 0;

  function flushBullets() {
    if (bulletBuffer.length === 0) return;
    result.push(
      <ul key={`ul-${keyCounter++}`} className="list-disc list-inside space-y-1 my-1">
        {bulletBuffer.map((b, i) => (
          <li key={i}>{applyBold(b)}</li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  }

  function applyBold(line: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;
    BOLD_PATTERN.lastIndex = 0;
    while ((match = BOLD_PATTERN.exec(line)) !== null) {
      if (match.index > last) parts.push(line.slice(last, match.index));
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      last = match.index + match[0].length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return parts;
  }

  for (const line of lines) {
    if (line.startsWith(BULLET_PREFIX)) {
      bulletBuffer.push(line.slice(BULLET_PREFIX.length));
    } else {
      flushBullets();
      if (line.trim() !== "") {
        result.push(<p key={`p-${keyCounter++}`} className="mb-1">{applyBold(line)}</p>);
      }
    }
  }
  flushBullets();
  return result;
}

const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

interface ChatMessageProps {
  role: "user" | "assistant";
  text: string;
}

const ChatMessage = memo(function ChatMessage({ role, text }: ChatMessageProps) {
  return (
    <div className={`flex items-end gap-2 ${role === "user" ? "justify-end" : "justify-start"}`}>
      {role === "assistant" && (
        <Image
          src="/chatbot-avatar.png"
          alt="Eddie"
          width={AVATAR_SIZE_MESSAGE}
          height={AVATAR_SIZE_MESSAGE}
          className="rounded-full object-cover flex-shrink-0"
        />
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          role === "user"
            ? "bg-accent-solid text-accent-contrast"
            : "bg-sunken text-ink"
        }`}
      >
        {role === "assistant" ? <div>{renderMarkdown(text)}</div> : text}
      </div>
    </div>
  );
});

export default function Chat({ onClose }: ChatProps) {
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: chatTransport,
  });

  const isLoading = status === "streaming" || status === "submitted";
  const isWaiting = status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: SCROLL_BEHAVIOR });
  }, [messages]);

  const charCount = input.length;
  const charWarning = charCount >= MAX_INPUT_CHARS * CHAR_WARN_THRESHOLD;
  const charDanger = charCount >= MAX_INPUT_CHARS;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = input.trim().slice(0, MAX_INPUT_CHARS);
    if (!trimmed || isLoading) return;
    sendMessage({ role: "user", parts: [{ type: "text", text: trimmed }] });
    setInput("");
  }

  return (
    <div className="flex flex-col w-80 h-[480px] rounded-3xl border border-line bg-sheet-solid shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-line">
        <div className="flex items-center gap-2">
          <Image
            src="/chatbot-avatar.png"
            alt="Eddie"
            width={AVATAR_SIZE_HEADER}
            height={AVATAR_SIZE_HEADER}
            className="rounded-full object-cover flex-shrink-0"
          />
          <span className="text-sm font-semibold text-ink">Ask me about Eddie</span>
        </div>
        <button
          onClick={onClose}
          className={`rounded-lg text-ink-faint hover:text-ink transition-colors text-lg leading-none ${FOCUS_RING}`}
          aria-label="Close chat"
        >
          &times;
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-sm text-ink-faint text-center mt-8">
            Ask me anything about Eddie
          </p>
        )}
        {messages.map((msg) => {
          const role = msg.role === "user" ? "user" : "assistant";
          const text = msg.parts
            .filter(isTextPart)
            .map((p) => p.text)
            .join("");

          return <ChatMessage key={msg.id} role={role} text={text} />;
        })}
        {isWaiting && (
          <div className="flex items-end gap-2 justify-start">
            <Image
              src="/chatbot-avatar.png"
              alt="Eddie"
              width={AVATAR_SIZE_MESSAGE}
              height={AVATAR_SIZE_MESSAGE}
              className="rounded-full object-cover flex-shrink-0"
            />
            <div className="bg-sunken rounded-2xl px-3 py-2">
              <span className="inline-flex gap-1 items-center h-4">
                <span
                  className="w-1 h-1 rounded-full bg-ink-faint animate-bounce"
                  style={{ animationDelay: `${DOT_DELAY_MS_1}ms` }}
                />
                <span
                  className="w-1 h-1 rounded-full bg-ink-faint animate-bounce"
                  style={{ animationDelay: `${DOT_DELAY_MS_2}ms` }}
                />
                <span
                  className="w-1 h-1 rounded-full bg-ink-faint animate-bounce"
                  style={{ animationDelay: `${DOT_DELAY_MS_3}ms` }}
                />
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-line">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            aria-label="Message input"
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_CHARS))}
            placeholder="Ask something..."
            disabled={isLoading}
            maxLength={MAX_INPUT_CHARS}
            className="flex-1 text-sm rounded-full border border-line-strong bg-paper text-ink placeholder-ink-faint px-4 py-2 outline-none focus:border-accent disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`rounded-full bg-accent-solid px-4 py-2 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-solid-hover disabled:opacity-40 ${FOCUS_RING}`}
          >
            Send
          </button>
        </form>
        {charCount > 0 && (
          <p
            className={`text-xs mt-1 text-right ${
              charDanger
                ? "text-red-500"
                : charWarning
                ? "text-orange-400"
                : "text-ink-faint"
            }`}
          >
            {charCount} / {MAX_INPUT_CHARS}
          </p>
        )}
      </div>
    </div>
  );
}
