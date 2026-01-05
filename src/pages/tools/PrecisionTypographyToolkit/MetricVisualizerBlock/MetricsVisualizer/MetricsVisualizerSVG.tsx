import { useEffect, useRef } from 'react';

interface LineConfig {
  x1: number;
  x2: number;
  y: number;
}
interface MeasureLineConfig {
  x: number;
  y1: number;
  y2: number;
}

interface MetricsVisualizerSVGProps {
  viewBox: {
    minY: number;
    width: number;
    height: number;
  };
  lines: {
    lineBoxTop: LineConfig;
    ascender: LineConfig;
    emBoxTop: LineConfig;
    capHeight: LineConfig;
    xHeight: LineConfig;
    baseline: LineConfig;
    emBoxBottom: LineConfig;
    descender: LineConfig;
    lineBoxBottom: LineConfig;
  };
  measureLines: {
    lineBox: MeasureLineConfig;
    emBox: MeasureLineConfig;
    capHeight: MeasureLineConfig;
    xHeight: MeasureLineConfig;
    ascender: MeasureLineConfig;
    descender: MeasureLineConfig;
    topTrim: MeasureLineConfig;
    bottomTrim: MeasureLineConfig;
  };
  vizText: string;
  fontFamily: string;
  unitsPerEm: number;
  onTextBBoxUpdate?: (bbox: DOMRect) => void;
}

export const MetricsVisualizerSVG = ({
  viewBox,
  lines,
  measureLines,
  vizText,
  fontFamily,
  unitsPerEm,
  onTextBBoxUpdate,
}: MetricsVisualizerSVGProps) => {
  const textRef = useRef<SVGTextElement>(null);

  // Calculate arrow size based on UPM
  const arrowSize = unitsPerEm * 0.025; // 2.5% of UPM
  const arrowWidth = arrowSize * 2;
  const arrowHeight = arrowSize * 2;
  const refPoint = arrowSize; // Center point

  useEffect(() => {
    if (textRef.current && onTextBBoxUpdate) {
      const bbox = textRef.current.getBBox();
      onTextBBoxUpdate(bbox);
    }
  }, [vizText, fontFamily, unitsPerEm, onTextBBoxUpdate]);

  return (
    <svg viewBox={`0 ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}>
      {/* Measure line arrows */}
      <defs>
        <marker
          id="arrow-start"
          markerWidth={arrowWidth}
          markerHeight={arrowHeight}
          refX={refPoint}
          refY={refPoint}
          orient="auto-start-reverse"
          markerUnits="userSpaceOnUse"
        >
          <path
            d={`M 0 0 L ${arrowWidth} ${refPoint} L 0 ${arrowHeight} z`}
            fill="var(--color-tertiary)"
          />
        </marker>

        <marker
          id="arrow-end"
          markerWidth={arrowWidth}
          markerHeight={arrowHeight}
          refX={refPoint}
          refY={refPoint}
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d={`M 0 0 L ${arrowWidth} ${refPoint} L 0 ${arrowHeight} z`}
            fill="var(--color-tertiary)"
          />
        </marker>
      </defs>
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

      {/* Ascender */}
      <line
        x1={lines.ascender.x1}
        x2={lines.ascender.x2}
        y1={lines.ascender.y}
        y2={lines.ascender.y}
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

      {/* descender */}
      <line
        x1={lines.descender.x1}
        x2={lines.descender.x2}
        y1={lines.descender.y}
        y2={lines.descender.y}
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

      {/* Measure lines */}
      {/* Line-box */}
      <line
        x1={measureLines.lineBox.x}
        x2={measureLines.lineBox.x}
        y1={measureLines.lineBox.y1}
        y2={measureLines.lineBox.y2}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        markerStart="url(#arrow-start)"
        markerEnd="url(#arrow-end)"
        vectorEffect="non-scaling-stroke"
      />

      {/* Em-box */}
      <line
        x1={measureLines.emBox.x}
        x2={measureLines.emBox.x}
        y1={measureLines.emBox.y1}
        y2={measureLines.emBox.y2}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        markerStart="url(#arrow-start)"
        markerEnd="url(#arrow-end)"
        vectorEffect="non-scaling-stroke"
      />

      {/* Cap Height */}
      <line
        x1={measureLines.capHeight.x}
        x2={measureLines.capHeight.x}
        y1={measureLines.capHeight.y1}
        y2={measureLines.capHeight.y2}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        markerStart="url(#arrow-start)"
        markerEnd="url(#arrow-end)"
        vectorEffect="non-scaling-stroke"
      />

      {/* x-Height */}
      <line
        x1={measureLines.xHeight.x}
        x2={measureLines.xHeight.x}
        y1={measureLines.xHeight.y1}
        y2={measureLines.xHeight.y2}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        markerStart="url(#arrow-start)"
        markerEnd="url(#arrow-end)"
        vectorEffect="non-scaling-stroke"
      />

      {/* Ascender (HHEA) */}
      <line
        x1={measureLines.ascender.x}
        x2={measureLines.ascender.x}
        y1={measureLines.ascender.y1}
        y2={measureLines.ascender.y2}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        markerStart="url(#arrow-start)"
        markerEnd="url(#arrow-end)"
        vectorEffect="non-scaling-stroke"
      />

      {/* Descender (HHEA) */}
      <line
        x1={measureLines.descender.x}
        x2={measureLines.descender.x}
        y1={measureLines.descender.y1}
        y2={measureLines.descender.y2}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        markerStart="url(#arrow-start)"
        markerEnd="url(#arrow-end)"
        vectorEffect="non-scaling-stroke"
      />

      {/* Top Trim */}
      <line
        x1={measureLines.topTrim.x}
        x2={measureLines.topTrim.x}
        y1={measureLines.topTrim.y1}
        y2={measureLines.topTrim.y2}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        markerStart="url(#arrow-start)"
        markerEnd="url(#arrow-end)"
        vectorEffect="non-scaling-stroke"
      />

      {/* Bottom Trim */}
      <line
        x1={measureLines.bottomTrim.x}
        x2={measureLines.bottomTrim.x}
        y1={measureLines.bottomTrim.y1}
        y2={measureLines.bottomTrim.y2}
        stroke="var(--color-tertiary)"
        strokeWidth="1"
        markerStart="url(#arrow-start)"
        markerEnd="url(#arrow-end)"
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
