"use client";

import { useState } from "react";
import Chat from "./Chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <Chat onClose={() => setIsOpen(false)} />
      )}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full bg-gray-900 dark:bg-white px-5 py-3 text-sm font-medium text-white dark:text-gray-900 shadow-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
      >
        {isOpen ? "Close" : "Chat"}
      </button>
    </div>
  );
}
