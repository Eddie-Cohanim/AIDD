const NAME_TEXT_ID = "hero-name-outline";
const FONT_SIZE = 160;
const FONT_WEIGHT = 800;
const FONT_STRETCH = "125%";
const CAP_HEIGHT = 116;
const LINE_HEIGHT = 176;
const TOP_MARGIN = 28;
const VIEWBOX_WIDTH = 1000;
const BOTTOM_MARGIN = 28;
const EXTRUSION_LAYERS = 12;

interface BlueprintNameProps {
  name: string;
}

function baselineFor(lineIndex: number): number {
  return TOP_MARGIN + CAP_HEIGHT + lineIndex * LINE_HEIGHT;
}

export default function BlueprintName({ name }: BlueprintNameProps) {
  const lines = name.split(" ");
  const lastBaseline = baselineFor(lines.length - 1);
  const viewBoxHeight = lastBaseline + EXTRUSION_LAYERS + BOTTOM_MARGIN;
  const layers = Array.from({ length: EXTRUSION_LAYERS }, (_, index) => EXTRUSION_LAYERS - index);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${viewBoxHeight}`}
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <text
          id={NAME_TEXT_ID}
          style={{
            fontFamily: "var(--font-archivo)",
            fontWeight: FONT_WEIGHT,
            fontStretch: FONT_STRETCH,
            fontSize: FONT_SIZE,
          }}
        >
          {lines.map((line, index) => (
            <tspan key={line} x={0} y={baselineFor(index)}>
              {line}
            </tspan>
          ))}
        </text>
      </defs>
      {lines.map((line, index) => (
        <g key={line}>
          <line className="hero-guide" x1={0} x2={VIEWBOX_WIDTH} y1={baselineFor(index)} y2={baselineFor(index)} />
          <line
            className="hero-guide"
            x1={0}
            x2={VIEWBOX_WIDTH}
            y1={baselineFor(index) - CAP_HEIGHT}
            y2={baselineFor(index) - CAP_HEIGHT}
          />
        </g>
      ))}
      <line className="hero-guide" x1={0} x2={0} y1={0} y2={viewBoxHeight} />
      {layers.map((layer) => (
        <use
          key={layer}
          href={`#${NAME_TEXT_ID}`}
          className="hero-layer"
          style={{ "--layer": layer } as React.CSSProperties}
        />
      ))}
      <use href={`#${NAME_TEXT_ID}`} className="hero-face" />
    </svg>
  );
}
