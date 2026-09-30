export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

export const CARD_SURFACE = "rounded-3xl border border-line bg-sheet backdrop-blur-sm";

export const TEXT_LINK = `text-accent underline-offset-4 hover:underline ${FOCUS_RING}`;

export const BUTTON_PRIMARY = `inline-flex items-center rounded-full bg-accent-solid px-6 py-3 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-solid-hover ${FOCUS_RING}`;

export const BUTTON_SECONDARY = `inline-flex items-center rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent ${FOCUS_RING}`;

export const GROUP_LABEL = "text-sm font-semibold text-ink";

export const BODY_TEXT = "leading-relaxed text-ink-muted";

export const DISPLAY_HEADING = "font-bold font-stretch-expanded tracking-tight text-ink";
