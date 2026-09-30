export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black";

export const CARD_SURFACE =
  "rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm";

export const TEXT_LINK = `text-accent underline-offset-4 hover:underline ${FOCUS_RING}`;

export const BUTTON_PRIMARY = `inline-flex items-center rounded-full bg-accent-solid px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-solid-hover ${FOCUS_RING}`;

export const BUTTON_SECONDARY = `inline-flex items-center rounded-full border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors hover:border-accent hover:text-accent ${FOCUS_RING}`;

export const EYEBROW =
  "text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400";

export const BODY_TEXT = "leading-relaxed text-gray-600 dark:text-gray-300";
