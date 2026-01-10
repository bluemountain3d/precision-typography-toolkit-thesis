import { useEffect, useMemo, useRef, useState } from 'react';
import { useFontMetrics } from '../../context';
import styles from './MetricsVisualizer.module.scss';
import classNames from 'clsx';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { MetricsVisualizerSVG } from './MetricsVisualizerSVG';
// import { print } from '@/utils';

interface MetricsVisualizerProps {
  lineHeight: number;
  kerning?: boolean;
}

export const MetricsVisualizer = ({
  lineHeight = 1.5,
  kerning,
}: MetricsVisualizerProps) => {
  const elemRef = useRef<HTMLDivElement>(null);

  const [visualizerData, setVisualizerData] = useState({
    fontSize: '',
    unitsPerRem: 0,
    viewBoxWidth: 0,
    maxTextWidth: 0,
    currentTextWidth: 0,
  });
  const [textBBox, setTextBBox] = useState<DOMRect | null>(null);

  const { state } = useFontMetrics();

  const isMobile = useMediaQuery(queries.isUpToTablet);

  const unitsPerEm = state.unitsPerEm || 0; // 1000 ?
  const halfLeading = state.halfLeading || 0;
  const topTrim = state.topTrim || 0;
  const bottomTrim = state.bottomTrim || 0;

  // test
  const textVariantWidths = state.textVariantWidths;
  const gapMinSpace = isMobile ? 1.25 * 8 : 2.75 * 8;

  useEffect(() => {
    const element = elemRef.current;

    if (!element) return;

    const updateMetrics = () => {
      const rootFontSize =
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

      const computedStyle = getComputedStyle(element);
      const fontSizeInPx = parseFloat(computedStyle.fontSize);
      const containerWidthPx = element.offsetWidth;
      const unitsPerRem = (unitsPerEm / fontSizeInPx) * rootFontSize;
      const viewBoxWidth = (containerWidthPx / fontSizeInPx) * unitsPerEm;

      setVisualizerData((prev) => ({
        ...prev,
        unitsPerRem,
        viewBoxWidth,
        maxTextWidth: viewBoxWidth - gapMinSpace * unitsPerRem,
      }));
    };

    const observer = new ResizeObserver(updateMetrics);
    observer.observe(element);

    updateMetrics();

    return () => observer.disconnect();
  }, [unitsPerEm, gapMinSpace]);

  const selectedVariant = useMemo(() => {
    if (!textVariantWidths || Object.keys(textVariantWidths).length === 0) {
      return { text: 'Hx', width: 0 };
    }

    const variants = ['Hxdg0', 'Hxdg', 'Hxlj', 'Hxd', 'Hxl', 'Hx'];

    const found =
      variants.find((key) => {
        const width = textVariantWidths[key] || 0;
        return width <= visualizerData.maxTextWidth;
      }) || 'Hx';

    return {
      text: found,
      width: textVariantWidths[found] || 0,
    };
  }, [visualizerData.maxTextWidth, textVariantWidths]);

  const viewBox = {
    minY: -(state.upmAscender || 0) - halfLeading,
    width: visualizerData.viewBoxWidth,
    height: unitsPerEm * lineHeight,
  };

  // Calculate gap in SVG units based on textBBox
  const measureLineGap = (num: number) => {
    return textBBox ? ((viewBox.width - selectedVariant.width) / 8) * num : 0;
  };

  // Y-positions for each linje
  const yPositions = {
    lineBoxTop: -(state.upmAscender || 0) - halfLeading,
    ascender: -(state.hheaAscender || 0),
    emBoxTop: -(state.upmAscender || 0),
    capHeight: -(state.capHeight || 0),
    xHeight: -(state.xHeight || 0),
    baseline: 0,
    emBoxBottom: -(state.upmDescender || 0),
    descender: -(state.hheaDescender || 0),
    lineBoxBottom: -(state.upmDescender || 0) + halfLeading,
  };

  // Calculate x-positions based on textBBox
  const getLineConfig = (
    y: number,
    x1: number,
    x2: number
  ): { x1: number; x2: number; y: number } => {
    if (!textBBox) {
      // Full width when we don't have textBBox yet
      return {
        x1: 0,
        x2: viewBox.width,
        y,
      };
    }

    // Use the included x1/x2 values
    return {
      x1,
      x2,
      y,
    };
  };

  const lines = {
    lineBoxTop: getLineConfig(yPositions.lineBoxTop, 0, viewBox.width),
    emBoxTop: getLineConfig(
      yPositions.emBoxTop,
      measureLineGap(1),
      viewBox.width - measureLineGap(3)
    ),
    ascender: getLineConfig(
      yPositions.ascender,
      measureLineGap(4),
      viewBox.width - measureLineGap(2)
    ),
    capHeight: getLineConfig(
      yPositions.capHeight,
      measureLineGap(2),
      viewBox.width
    ),
    xHeight: getLineConfig(
      yPositions.xHeight,
      measureLineGap(3),
      viewBox.width - measureLineGap(3.5)
    ),
    baseline: getLineConfig(
      yPositions.baseline,
      measureLineGap(2),
      viewBox.width
    ),
    emBoxBottom: getLineConfig(
      yPositions.emBoxBottom,
      measureLineGap(1),
      viewBox.width - measureLineGap(3)
    ),
    descender: getLineConfig(
      yPositions.descender,
      measureLineGap(4),
      viewBox.width - measureLineGap(2)
    ),
    lineBoxBottom: getLineConfig(yPositions.lineBoxBottom, 0, viewBox.width),
  };

  const measureLines = {
    lineBox: {
      x: 0,
      y1: yPositions.lineBoxTop + 25,
      y2: yPositions.lineBoxBottom - 25,
    },
    emBox: {
      x: measureLineGap(1),
      y1: yPositions.emBoxTop + 25,
      y2: yPositions.emBoxBottom - 25,
    },
    capHeight: {
      x: measureLineGap(2),
      y1: yPositions.capHeight + 25,
      y2: yPositions.baseline - 25,
    },
    xHeight: {
      x: measureLineGap(3),
      y1: yPositions.xHeight + 25,
      y2: yPositions.baseline - 25,
    },
    ascender: {
      x: viewBox.width - measureLineGap(2),
      y1: yPositions.ascender + 25,
      y2: yPositions.baseline - 25,
    },
    descender: {
      x: viewBox.width - measureLineGap(2),
      y1: yPositions.baseline + 25,
      y2: yPositions.descender - 25,
    },
    topTrim: {
      x: viewBox.width,
      y1: yPositions.lineBoxTop + 25,
      y2: yPositions.capHeight - 25,
    },
    bottomTrim: {
      x: viewBox.width,
      y1: yPositions.baseline + 25,
      y2: yPositions.lineBoxBottom - 25,
    },
    lsbAdjust: {
      x: measureLineGap(4) + (state.lsbAdjustRaw || 0) / 2,
      y1: yPositions.capHeight + 25,
      y2: yPositions.baseline - 25,
      isTransparent: true,
      noMarkers: true,
    },
    rsbAdjust: {
      x: viewBox.width - measureLineGap(4) - (state.rsbAdjustRaw || 0) / 2,
      y1: yPositions.capHeight + 25,
      y2: yPositions.baseline - 25,
      isTransparent: true,
      noMarkers: true,
    },
  };

  const rectangles = {
    lineBox: {
      x: 0,
      y: yPositions.lineBoxTop,
      width: viewBox.width,
      height: viewBox.height,
    },
    emBox: {
      x: measureLineGap(1),
      y: yPositions.emBoxTop,
      width: viewBox.width - measureLineGap(4),
      height: viewBox.height - halfLeading * 2,
    },
    capHeight: {
      x: measureLineGap(2),
      y: yPositions.capHeight,
      width: viewBox.width - measureLineGap(5),
      height: -yPositions.capHeight,
    },
    xHeight: {
      x: measureLineGap(3),
      y: yPositions.xHeight,
      width: viewBox.width - measureLineGap(6),
      height: -yPositions.xHeight,
    },
    ascender: {
      x: measureLineGap(4),
      y: yPositions.ascender,
      width: viewBox.width - measureLineGap(6),
      height: -yPositions.ascender,
    },
    descender: {
      x: measureLineGap(4),
      y: yPositions.baseline,
      width: viewBox.width - measureLineGap(6),
      height: yPositions.descender,
    },
    topTrim: {
      x: measureLineGap(2),
      y: yPositions.lineBoxTop,
      width: viewBox.width - measureLineGap(2),
      height: topTrim,
    },
    bottomTrim: {
      x: measureLineGap(2),
      y: yPositions.baseline,
      width: viewBox.width - measureLineGap(2),
      height: bottomTrim,
    },
    lsbAdjust: {
      x: measureLineGap(4),
      y: yPositions.capHeight,
      width: state.rsbAdjustRaw || 0,
      height: Math.abs(yPositions.capHeight),
    },
    rsbAdjust: {
      x: viewBox.width - measureLineGap(4) - (state.rsbAdjustRaw || 0),
      y: yPositions.capHeight,
      width: state.rsbAdjustRaw || 0,
      height: Math.abs(yPositions.capHeight),
    },
  };

  return (
    <div ref={elemRef} className={classNames(styles['metrics-visualizer'])}>
      <MetricsVisualizerSVG
        viewBox={viewBox}
        lines={lines}
        measureLines={measureLines}
        rectangles={rectangles}
        unitsPerEm={state.unitsPerEm || 0}
        unitsPerRem={visualizerData.unitsPerRem || 0}
        fontFamily={state.loadedFontFamily || 'sans-serif'}
        vizText={selectedVariant.text}
        kerning={kerning}
        onTextBBoxUpdate={setTextBBox}
      />
    </div>
  );
};
