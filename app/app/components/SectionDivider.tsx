const SPINDLE_LENGTH = 100;
// Odd height so the centered 1px line fills exactly one pixel row instead of blurring across two.
const SPINDLE_HEIGHT = 7;
const SPINDLE_MID = SPINDLE_HEIGHT / 2;
// Where along the spindle the single line splits into two branches.
const SPINDLE_SPLIT = 55;
// Curve control for the branches, keeping them close until they near the ring.
const SPINDLE_BEND = 85;
// How far each branch moves from the center line by the time it meets the ring.
const SPINDLE_SPREAD = 2;
const SPINDLE_STROKE = 1;

// Odd size, matching the spindle, so both share a half-pixel center line.
const RING_SIZE = 17;
const RING_CENTER = RING_SIZE / 2;
const RING_STROKE = 1.5;
const RING_RADIUS = RING_CENTER - RING_STROKE;

const STRAIGHT_PATH = `M0 ${SPINDLE_MID} L${SPINDLE_SPLIT} ${SPINDLE_MID}`;
const BRANCH_PATH = [
  `M${SPINDLE_SPLIT} ${SPINDLE_MID}`,
  `Q${SPINDLE_BEND} ${SPINDLE_MID} ${SPINDLE_LENGTH} ${SPINDLE_MID - SPINDLE_SPREAD}`,
  `M${SPINDLE_SPLIT} ${SPINDLE_MID}`,
  `Q${SPINDLE_BEND} ${SPINDLE_MID} ${SPINDLE_LENGTH} ${SPINDLE_MID + SPINDLE_SPREAD}`,
].join(" ");

// A hairline that fades out at its outer end and splits in two as it approaches the ring.
function Spindle({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${SPINDLE_LENGTH} ${SPINDLE_HEIGHT}`}
      preserveAspectRatio="none"
      className={`spindle-fade h-1.75 flex-1 stroke-ink-faint ${mirrored ? "-scale-x-100" : ""}`}
      fill="none"
      strokeWidth={SPINDLE_STROKE}
    >
      {/* Snapped to the pixel grid so the long straight run stays sharp at any zoom level. */}
      <path d={STRAIGHT_PATH} shapeRendering="crispEdges" vectorEffect="non-scaling-stroke" />
      <path d={BRANCH_PATH} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function SectionDivider() {
  return (
    <div aria-hidden="true" className="mx-auto flex max-w-4xl items-center px-6">
      <Spindle />
      <svg
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        className="relative -mx-0.5 h-4.25 w-4.25 shrink-0 fill-paper stroke-ink-faint"
        strokeWidth={RING_STROKE}
      >
        <circle cx={RING_CENTER} cy={RING_CENTER} r={RING_RADIUS} />
      </svg>
      <Spindle mirrored />
    </div>
  );
}
