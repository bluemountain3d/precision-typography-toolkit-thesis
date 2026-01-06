import { useEffect, useRef, useState } from 'react';
import { useFontMetrics } from '../../context';
import styles from './MetricsVisualizer.module.scss';
import classNames from 'clsx';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { MetricsVisualizerSVG } from './MetricsVisualizerSVG';

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
    width: 0,
    viewBoxWidth: 0,
    vizText: '',
  });
  const [textBBox, setTextBBox] = useState<DOMRect | null>(null);

  const { state } = useFontMetrics();

  const isMobile = useMediaQuery(queries.isUpToTablet);
  const isDesktop = useMediaQuery(queries.isLaptopAndUp);

  useEffect(() => {
    const updateVisualizerData = () => {
      if (elemRef.current) {
        const rootFontSize = parseFloat(
          getComputedStyle(document.documentElement).fontSize
        );
        const computedStyle = getComputedStyle(elemRef.current);
        const fontSizeInPx = parseFloat(computedStyle.fontSize);
        const width = elemRef.current.offsetWidth;
        const unitsPerEm = state.unitsPerEm || 1000;
        const unitsPerRem = (unitsPerEm / fontSizeInPx) * rootFontSize;
        const viewBoxWidth = (width / fontSizeInPx) * unitsPerEm;
        const vizText = isMobile ? 'Hxlj' : isDesktop ? 'Hxdg0' : 'Hxdg';

        setVisualizerData({
          fontSize: computedStyle.fontSize,
          unitsPerRem,
          width,
          viewBoxWidth,
          vizText,
        });
      }
    };

    updateVisualizerData();

    window.addEventListener('resize', updateVisualizerData);
    return () => window.removeEventListener('resize', updateVisualizerData);
  }, [state.unitsPerEm, isMobile, isDesktop]);

  const unitsPerEm = state.unitsPerEm || 1000;
  const halfLeading = (unitsPerEm * (lineHeight - 1)) / 2;
  const topTrim = (state.topTrim || 0) + halfLeading;
  const bottomTrim = (state.bottomTrim || 0) + halfLeading;

  const viewBox = {
    minY: -(state.upmAscender || 0) - halfLeading,
    width: visualizerData.viewBoxWidth,
    height: unitsPerEm * lineHeight,
  };

  // Calculate gap in SVG units based on textBBox
  const measureLineGap = (num: number) => {
    return textBBox ? ((viewBox.width - textBBox.width) / 8) * num : 0;
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
  };

  const rectangles = {
    lineBox: {
      x: 0,
      y: yPositions.lineBoxTop,
      width: viewBox.width,
      height: viewBox.height,
    },
    ascender: {
      x: measureLineGap(4),
      y: yPositions.ascender,
      width: viewBox.width - measureLineGap(6),
      height: -yPositions.ascender,
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
        vizText={visualizerData.vizText}
        kerning={kerning}
        onTextBBoxUpdate={setTextBBox}
      />
    </div>
  );
};
