import { useEffect, useRef } from 'react';

interface LineConfig {
  x1: number;
  x2: number;
  y: number;
}

interface MetricsVisualizerSVGProps {
  viewBox: {
    minY: number;
    width: number;
    height: number;
  };
  lines: {
    lineBoxTop: LineConfig;
    emBoxTop: LineConfig;
    capHeight: LineConfig;
    xHeight: LineConfig;
    baseline: LineConfig;
    emBoxBottom: LineConfig;
    lineBoxBottom: LineConfig;
  };
  vizText: string;
  fontFamily: string;
  unitsPerEm: number;
  onTextBBoxUpdate?: (bbox: DOMRect) => void;
}

export const MetricsVisualizerSVG = ({
  viewBox,
  lines,
  vizText,
  fontFamily,
  unitsPerEm,
  onTextBBoxUpdate,
}: MetricsVisualizerSVGProps) => {
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (textRef.current && onTextBBoxUpdate) {
      const bbox = textRef.current.getBBox();
      onTextBBoxUpdate(bbox);
    }
  }, [vizText, fontFamily, unitsPerEm, onTextBBoxUpdate]);

  return (
    <svg viewBox={`0 ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}>
      {/* Lines */}

      {/* Line-box top */}
      <line
        x1={lines.lineBoxTop.x1}
        x2={lines.lineBoxTop.x2}
        y1={lines.lineBoxTop.y}
        y2={lines.lineBoxTop.y}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Em-box top */}
      <line
        x1={lines.emBoxTop.x1}
        x2={lines.emBoxTop.x2}
        y1={lines.emBoxTop.y}
        y2={lines.emBoxTop.y}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Cap Height */}
      <line
        x1={lines.capHeight.x1}
        x2={lines.capHeight.x2}
        y1={lines.capHeight.y}
        y2={lines.capHeight.y}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* x-Height */}
      <line
        x1={lines.xHeight.x1}
        x2={lines.xHeight.x2}
        y1={lines.xHeight.y}
        y2={lines.xHeight.y}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Baseline */}
      <line
        x1={lines.baseline.x1}
        x2={lines.baseline.x2}
        y1={lines.baseline.y}
        y2={lines.baseline.y}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Em-box bottom */}
      <line
        x1={lines.emBoxBottom.x1}
        x2={lines.emBoxBottom.x2}
        y1={lines.emBoxBottom.y}
        y2={lines.emBoxBottom.y}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Line-box bottom */}
      <line
        x1={lines.lineBoxBottom.x1}
        x2={lines.lineBoxBottom.x2}
        y1={lines.lineBoxBottom.y}
        y2={lines.lineBoxBottom.y}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Text */}
      <text
        ref={textRef}
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
