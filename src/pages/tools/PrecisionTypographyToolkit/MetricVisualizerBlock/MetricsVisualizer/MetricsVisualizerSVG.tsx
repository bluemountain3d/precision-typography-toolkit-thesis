import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { MetricLine } from './MetricLine';
import { MeasureLine } from './MeasureLine';
import { MetricToggleButton } from './MetricToggleButton';
import { AreaRectangle } from './AreaRectangle';
import { VisualizerDefs } from './VisualizerDefs';

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
  unitsPerRem: number;
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
  unitsPerRem,
  onTextBBoxUpdate,
}: MetricsVisualizerSVGProps) => {
  const [selectedMetric, setSelectedMetric] = useState('');
  // TODO : Set context with `selectedMetric`
  const textRef = useRef<SVGTextElement>(null);
  const isTabletUp = useMediaQuery(queries.isTabletAndUp);

  // Calculate arrow size based on UPM
  const arrowSize = unitsPerEm * 0.025; // 2.5% of UPM
  const arrowWidth = arrowSize * 2;
  const arrowHeight = arrowSize * 2;
  const refPoint = arrowSize; // Center point

  const rectangleColor = 'var(--color-tertiary)';
  const lineColor = 'var(--color-tertiary)';
  const measureColor = 'var(--color-tertiary)';
  const selectedMeasureColor = 'var(--color-primary-border-hover)';

  const hitBoxSize = 2.75 * unitsPerRem;
  const outerRadius = 0.75 * unitsPerRem;
  const outerRadiusSelected = unitsPerRem;
  const innerRadius = 0.625 * unitsPerRem;
  const innerRadiusSelected = 0.9375 * unitsPerRem;

  useEffect(() => {
    if (textRef.current && onTextBBoxUpdate) {
      const bbox = textRef.current.getBBox();
      onTextBBoxUpdate(bbox);
    }
  }, [vizText, fontFamily, unitsPerEm, onTextBBoxUpdate]);

  const metricsList = [
    {
      id: 'lineBox',
      line: null,
      measure: measureLines.lineBox,
      rectangle: rectangles.lineBox,
    },
    {
      id: 'lineBoxTop',
      line: lines.lineBoxTop,
      measure: null,
      rectangle: null,
    },
    {
      id: 'lineBoxBottom',
      line: lines.lineBoxBottom,
      measure: null,
      rectangle: null,
    },
    {
      id: 'ascender',
      line: lines.ascender,
      measure: measureLines.ascender,
      rectangle: rectangles.ascender,
    },
    {
      id: 'emBox',
      line: null,
      measure: measureLines.emBox,
      rectangle: rectangles.emBox,
    },
    {
      id: 'emBoxTop',
      line: lines.emBoxTop,
      measure: null,
      rectangle: null,
    },
    {
      id: 'emBoxBottom',
      line: lines.emBoxBottom,
      measure: null,
      rectangle: null,
    },
    {
      id: 'capHeight',
      line: lines.capHeight,
      measure: measureLines.capHeight,
      rectangle: rectangles.capHeight,
    },
    {
      id: 'xHeight',
      line: lines.xHeight,
      measure: measureLines.xHeight,
      rectangle: rectangles.xHeight,
    },
    {
      id: 'baseline',
      line: lines.baseline,
      measure: null,
      rectangle: null,
    },
    {
      id: 'descender',
      line: lines.descender,
      measure: measureLines.descender,
      rectangle: rectangles.descender,
    },
    {
      id: 'topTrim',
      line: null,
      measure: measureLines.topTrim,
      rectangle: rectangles.topTrim,
    },
    {
      id: 'bottomTrim',
      line: null,
      measure: measureLines.bottomTrim,
      rectangle: rectangles.bottomTrim,
    },
  ];

  return (
    <svg viewBox={`0 ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}>
      {/* Measure line arrows */}

      <VisualizerDefs
        arrowWidth={arrowWidth}
        arrowHeight={arrowHeight}
        refPoint={refPoint}
        measureColor={measureColor}
        selectedMeasureColor={selectedMeasureColor}
        unitsPerRem={unitsPerRem}
      />

      {/* Area rectangles */}

      {metricsList.map(
        ({ id, rectangle }) =>
          rectangle && (
            <AreaRectangle
              key={`rectangle-${id}`}
              {...rectangle}
              isSelected={selectedMetric === id}
              color={rectangleColor}
            />
          )
      )}

      {/* Metric lines */}

      {metricsList.map(
        ({ id, line }) =>
          line && (
            <MetricLine
              key={`line-${id}`}
              {...line}
              color={lineColor}
              label={id}
            />
          )
      )}

      {/* Measure lines */}

      {metricsList.map(
        ({ id, measure }) =>
          measure && (
            <MeasureLine
              key={`measure-${id}`}
              {...measure}
              isSelected={selectedMetric === id}
              color={measureColor}
              colorSelected={selectedMeasureColor}
            />
          )
      )}

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

      {/* Toggle buttons */}

      {isTabletUp &&
        metricsList.map(
          ({ id, measure }) =>
            measure && (
              <MetricToggleButton
                key={id}
                x={measure.x}
                y={(measure.y1 + measure.y2) / 2}
                isSelected={selectedMetric === id}
                metricId={id}
                hitBoxSize={hitBoxSize}
                outerRadius={outerRadius}
                outerRadiusSelected={outerRadiusSelected}
                innerRadius={innerRadius}
                innerRadiusSelected={innerRadiusSelected}
                onSelect={setSelectedMetric}
              />
            )
        )}
    </svg>
  );
};
