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

interface RectangleConfig {
  x: number;
  y: number;
  width: number;
  height: number;
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
  rectangles: {
    lineBox: RectangleConfig;
    ascender: RectangleConfig;
    emBox: RectangleConfig;
    capHeight: RectangleConfig;
    xHeight: RectangleConfig;
    descender: RectangleConfig;
    topTrim: RectangleConfig;
    bottomTrim: RectangleConfig;
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
  rectangles,
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

  const selectedMetric: string = ''; // TODO : Get from `state.selectedMetric`

  const baseLineColor = 'var(--color-accent)';
  const rectangleColor = 'var(--color-tertiary)';
  const lineColor = 'var(--color-tertiary)';
  const measureColor = 'var(--color-tertiary)';
  const selectedMeasureColor = 'var(--color-primary-border-hover)';

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
            fill={measureColor}
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
            fill={measureColor}
          />
        </marker>

        <marker
          id="arrow-start--selected"
          markerWidth={arrowWidth}
          markerHeight={arrowHeight}
          refX={refPoint}
          refY={refPoint}
          orient="auto-start-reverse"
          markerUnits="userSpaceOnUse"
        >
          <path
            d={`M 0 0 L ${arrowWidth} ${refPoint} L 0 ${arrowHeight} z`}
            fill={selectedMeasureColor}
          />
        </marker>

        <marker
          id="arrow-end--selected"
          markerWidth={arrowWidth}
          markerHeight={arrowHeight}
          refX={refPoint}
          refY={refPoint}
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d={`M 0 0 L ${arrowWidth} ${refPoint} L 0 ${arrowHeight} z`}
            fill={selectedMeasureColor}
          />
        </marker>
      </defs>

      {/* ================================================================= */}

      {/* Rect: Line-box */}
      {selectedMetric === 'lineBox' && (
        <rect
          x={rectangles.lineBox.x}
          y={rectangles.lineBox.y}
          width={rectangles.lineBox.width}
          height={rectangles.lineBox.height}
          fill={rectangleColor}
        />
      )}

      {/* Rect: Ascender */}
      {selectedMetric === 'ascender' && (
        <rect
          x={rectangles.ascender.x}
          y={rectangles.ascender.y}
          width={rectangles.ascender.width}
          height={rectangles.ascender.height}
          fill={rectangleColor}
        />
      )}

      {/* Rect: Em-box */}
      {selectedMetric === 'emBox' && (
        <rect
          x={rectangles.emBox.x}
          y={rectangles.emBox.y}
          width={rectangles.emBox.width}
          height={rectangles.emBox.height}
          fill={rectangleColor}
        />
      )}

      {/* Rect: Cap Height */}
      {selectedMetric === 'capHeight' && (
        <rect
          x={rectangles.capHeight.x}
          y={rectangles.capHeight.y}
          width={rectangles.capHeight.width}
          height={rectangles.capHeight.height}
          fill={rectangleColor}
        />
      )}

      {/* Rect: x-Height */}
      {selectedMetric === 'xHeight' && (
        <rect
          x={rectangles.xHeight.x}
          y={rectangles.xHeight.y}
          width={rectangles.xHeight.width}
          height={rectangles.xHeight.height}
          fill={rectangleColor}
        />
      )}

      {/* Rect: Descender */}
      {selectedMetric === 'descender' && (
        <rect
          x={rectangles.descender.x}
          y={rectangles.descender.y}
          width={rectangles.descender.width}
          height={rectangles.descender.height}
          fill={rectangleColor}
        />
      )}

      {/* Rect: Top Trim */}
      {selectedMetric === 'topTrim' && (
        <rect
          x={rectangles.topTrim.x}
          y={rectangles.topTrim.y}
          width={rectangles.topTrim.width}
          height={rectangles.topTrim.height}
          fill={rectangleColor}
        />
      )}

      {/* Rect: Top Trim */}
      {selectedMetric === 'bottomTrim' && (
        <rect
          x={rectangles.bottomTrim.x}
          y={rectangles.bottomTrim.y}
          width={rectangles.bottomTrim.width}
          height={rectangles.bottomTrim.height}
          fill={rectangleColor}
        />
      )}

      {/* ================================================================= */}

      {/* Line: Line-box top */}
      <line
        x1={lines.lineBoxTop.x1}
        x2={lines.lineBoxTop.x2}
        y1={lines.lineBoxTop.y}
        y2={lines.lineBoxTop.y}
        stroke={lineColor}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Line: Ascender */}
      <line
        x1={lines.ascender.x1}
        x2={lines.ascender.x2}
        y1={lines.ascender.y}
        y2={lines.ascender.y}
        stroke={lineColor}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Line: Em-box top */}
      <line
        x1={lines.emBoxTop.x1}
        x2={lines.emBoxTop.x2}
        y1={lines.emBoxTop.y}
        y2={lines.emBoxTop.y}
        stroke={lineColor}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Line: Cap Height */}
      <line
        x1={lines.capHeight.x1}
        x2={lines.capHeight.x2}
        y1={lines.capHeight.y}
        y2={lines.capHeight.y}
        stroke={lineColor}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Line: x-Height */}
      <line
        x1={lines.xHeight.x1}
        x2={lines.xHeight.x2}
        y1={lines.xHeight.y}
        y2={lines.xHeight.y}
        stroke={lineColor}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Line: Baseline */}
      <line
        x1={lines.baseline.x1}
        x2={lines.baseline.x2}
        y1={lines.baseline.y}
        y2={lines.baseline.y}
        stroke={baseLineColor}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Line: Em-box bottom */}
      <line
        x1={lines.emBoxBottom.x1}
        x2={lines.emBoxBottom.x2}
        y1={lines.emBoxBottom.y}
        y2={lines.emBoxBottom.y}
        stroke={lineColor}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Line: descender */}
      <line
        x1={lines.descender.x1}
        x2={lines.descender.x2}
        y1={lines.descender.y}
        y2={lines.descender.y}
        stroke={lineColor}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Line: Line-box bottom */}
      <line
        x1={lines.lineBoxBottom.x1}
        x2={lines.lineBoxBottom.x2}
        y1={lines.lineBoxBottom.y}
        y2={lines.lineBoxBottom.y}
        stroke={lineColor}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* ================================================================= */}

      {/* Measure: Line-box */}
      <line
        x1={measureLines.lineBox.x}
        x2={measureLines.lineBox.x}
        y1={measureLines.lineBox.y1}
        y2={measureLines.lineBox.y2}
        stroke={
          selectedMetric === 'lineBox' ? selectedMeasureColor : measureColor
        }
        strokeWidth="1"
        markerStart={
          selectedMetric === 'lineBox'
            ? 'url(#arrow-start--selected)'
            : 'url(#arrow-start)'
        }
        markerEnd={
          selectedMetric === 'lineBox'
            ? 'url(#arrow-end--selected)'
            : 'url(#arrow-end)'
        }
        vectorEffect="non-scaling-stroke"
      />

      {/* Measure: Em-box */}
      <line
        x1={measureLines.emBox.x}
        x2={measureLines.emBox.x}
        y1={measureLines.emBox.y1}
        y2={measureLines.emBox.y2}
        stroke={
          selectedMetric === 'emBox' ? selectedMeasureColor : measureColor
        }
        strokeWidth="1"
        markerStart={
          selectedMetric === 'emBox'
            ? 'url(#arrow-start--selected)'
            : 'url(#arrow-start)'
        }
        markerEnd={
          selectedMetric === 'emBox'
            ? 'url(#arrow-end--selected)'
            : 'url(#arrow-end)'
        }
        vectorEffect="non-scaling-stroke"
      />

      {/* Measure: Cap Height */}
      <line
        x1={measureLines.capHeight.x}
        x2={measureLines.capHeight.x}
        y1={measureLines.capHeight.y1}
        y2={measureLines.capHeight.y2}
        stroke={
          selectedMetric === 'capHeight' ? selectedMeasureColor : measureColor
        }
        strokeWidth="1"
        markerStart={
          selectedMetric === 'capHeight'
            ? 'url(#arrow-start--selected)'
            : 'url(#arrow-start)'
        }
        markerEnd={
          selectedMetric === 'capHeight'
            ? 'url(#arrow-end--selected)'
            : 'url(#arrow-end)'
        }
        vectorEffect="non-scaling-stroke"
      />

      {/* Measure: x-Height */}
      <line
        x1={measureLines.xHeight.x}
        x2={measureLines.xHeight.x}
        y1={measureLines.xHeight.y1}
        y2={measureLines.xHeight.y2}
        stroke={
          selectedMetric === 'xHeight' ? selectedMeasureColor : measureColor
        }
        strokeWidth="1"
        markerStart={
          selectedMetric === 'xHeight'
            ? 'url(#arrow-start--selected)'
            : 'url(#arrow-start)'
        }
        markerEnd={
          selectedMetric === 'xHeight'
            ? 'url(#arrow-end--selected)'
            : 'url(#arrow-end)'
        }
        vectorEffect="non-scaling-stroke"
      />

      {/* Measure: Ascender (HHEA) */}
      <line
        x1={measureLines.ascender.x}
        x2={measureLines.ascender.x}
        y1={measureLines.ascender.y1}
        y2={measureLines.ascender.y2}
        stroke={
          selectedMetric === 'ascender' ? selectedMeasureColor : measureColor
        }
        strokeWidth="1"
        markerStart={
          selectedMetric === 'ascender'
            ? 'url(#arrow-start--selected)'
            : 'url(#arrow-start)'
        }
        markerEnd={
          selectedMetric === 'ascender'
            ? 'url(#arrow-end--selected)'
            : 'url(#arrow-end)'
        }
        vectorEffect="non-scaling-stroke"
      />

      {/* Measure: Descender (HHEA) */}
      <line
        x1={measureLines.descender.x}
        x2={measureLines.descender.x}
        y1={measureLines.descender.y1}
        y2={measureLines.descender.y2}
        stroke={
          selectedMetric === 'descender' ? selectedMeasureColor : measureColor
        }
        strokeWidth="1"
        markerStart={
          selectedMetric === 'descender'
            ? 'url(#arrow-start--selected)'
            : 'url(#arrow-start)'
        }
        markerEnd={
          selectedMetric === 'descender'
            ? 'url(#arrow-end--selected)'
            : 'url(#arrow-end)'
        }
        vectorEffect="non-scaling-stroke"
      />

      {/* Measure: Top Trim */}
      <line
        x1={measureLines.topTrim.x}
        x2={measureLines.topTrim.x}
        y1={measureLines.topTrim.y1}
        y2={measureLines.topTrim.y2}
        stroke={
          selectedMetric === 'topTrim' ? selectedMeasureColor : measureColor
        }
        strokeWidth="1"
        markerStart={
          selectedMetric === 'topTrim'
            ? 'url(#arrow-start--selected)'
            : 'url(#arrow-start)'
        }
        markerEnd={
          selectedMetric === 'topTrim'
            ? 'url(#arrow-end--selected)'
            : 'url(#arrow-end)'
        }
        vectorEffect="non-scaling-stroke"
      />

      {/* Measure: Bottom Trim */}
      <line
        x1={measureLines.bottomTrim.x}
        x2={measureLines.bottomTrim.x}
        y1={measureLines.bottomTrim.y1}
        y2={measureLines.bottomTrim.y2}
        stroke={
          selectedMetric === 'bottomTrim' ? selectedMeasureColor : measureColor
        }
        strokeWidth="1"
        markerStart={
          selectedMetric === 'bottomTrim'
            ? 'url(#arrow-start--selected)'
            : 'url(#arrow-start)'
        }
        markerEnd={
          selectedMetric === 'bottomTrim'
            ? 'url(#arrow-end--selected)'
            : 'url(#arrow-end)'
        }
        vectorEffect="non-scaling-stroke"
      />

      {/* ================================================================= */}

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
