interface MetricsVisualizerSVGProps {
  viewBox: {
    minY: number; // baseline position
    width: number;
    height: number;
  };
  lines: {
    lineBoxTop: number;
    emBoxTop: number;
    capHeight: number;
    xHeight: number;
    baseline: number;
    emBoxBottom: number;
    lineBoxBottom: number;
  };
  vizText: string;
  fontFamily: string;
  unitsPerEm: number;
}

export const MetricsVisualizerSVG = ({
  viewBox,
  lines,
  vizText,
  fontFamily,
  unitsPerEm,
}: MetricsVisualizerSVGProps) => {
  return (
    <svg viewBox={`0 ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}>
      {/* Lines */}

      {/* Line-box top */}
      <line
        x1="0"
        x2={viewBox.width}
        y1={lines.lineBoxTop}
        y2={lines.lineBoxTop}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Em-box top */}
      <line
        x1="0"
        x2={viewBox.width}
        y1={lines.emBoxTop}
        y2={lines.emBoxTop}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Cap Height */}
      <line
        x1="0"
        x2={viewBox.width}
        y1={lines.capHeight}
        y2={lines.capHeight}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* x-Height */}
      <line
        x1="0"
        x2={viewBox.width}
        y1={lines.xHeight}
        y2={lines.xHeight}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Baseline */}
      <line
        x1="0"
        x2={viewBox.width}
        y1="0" //{lines.baseline}
        y2="0" //{lines.baseline}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Em-box bottom */}
      <line
        x1="0"
        x2={viewBox.width}
        y1={lines.emBoxBottom}
        y2={lines.emBoxBottom}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Line-box bottom */}
      <line
        x1="0"
        x2={viewBox.width}
        y1={lines.lineBoxBottom}
        y2={lines.lineBoxBottom}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Boxes */}

      {/* Toggles */}

      {/* Text */}
      <text
        x={viewBox.width / 2}
        y="0"
        fontFamily={fontFamily}
        fontSize={unitsPerEm}
        dominantBaseline="alphabetic"
        textAnchor="middle"
        fill="var(--color-text-primary)"
      >
        {vizText}
      </text>
    </svg>
  );
};
