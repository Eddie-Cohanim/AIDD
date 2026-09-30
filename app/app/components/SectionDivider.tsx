const TICK_SIZE = 12;
const TICK_CENTER = TICK_SIZE / 2;
const TICK_INSET = 2;

function DimensionTick() {
  return (
    <svg
      viewBox={`0 0 ${TICK_SIZE} ${TICK_SIZE}`}
      className="h-3 w-3 shrink-0 stroke-ink-faint"
      fill="none"
      strokeLinecap="round"
    >
      <line x1={TICK_CENTER} y1={0} x2={TICK_CENTER} y2={TICK_SIZE} />
      <line x1={TICK_INSET} y1={TICK_SIZE - TICK_INSET} x2={TICK_SIZE - TICK_INSET} y2={TICK_INSET} />
    </svg>
  );
}

export default function SectionDivider() {
  return (
    <div aria-hidden="true" className="mx-auto flex max-w-4xl items-center px-6">
      <DimensionTick />
      <span className="-mx-1.5 h-px flex-1 bg-line-strong" />
      <DimensionTick />
    </div>
  );
}
