"use client";

import { useState } from "react";
import Chat from "./Chat";
import { FOCUS_RING } from "@/lib/styles";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <Chat onClose={() => setIsOpen(false)} />
      )}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`rounded-full bg-accent-solid px-5 py-3 text-sm font-semibold text-accent-contrast shadow-lg transition-colors hover:bg-accent-solid-hover ${FOCUS_RING}`}
      >
        {isOpen ? "Close" : "Chat"}
      </button>
    </div>
  );
}
