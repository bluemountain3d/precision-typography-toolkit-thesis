import { useEffect, useRef, useState } from 'react';
import { useFontMetrics } from '../../context';
import styles from './MetricsVisualizer.module.scss';
import classNames from 'clsx';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { MetricsVisualizerSVG } from './MetricsVisualizerSVG';

interface MetricsVisualizerProps {
  lineHeight: number;
}

export const MetricsVisualizer = ({
  lineHeight = 1.2,
}: MetricsVisualizerProps) => {
  const elemRef = useRef<HTMLDivElement>(null);

  const [visualizerData, setVisualizerData] = useState({
    fontSize: '',
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
        const computedStyle = getComputedStyle(elemRef.current);
        const fontSizeInPx = parseFloat(computedStyle.fontSize);
        const width = elemRef.current.offsetWidth;
        const unitsPerEm = state.unitsPerEm || 1000;
        const viewBoxWidth = (width / fontSizeInPx) * unitsPerEm;
        const vizText = isMobile ? 'Hxlg' : isDesktop ? 'Hxdg0' : 'Hxdpg';

        setVisualizerData({
          fontSize: computedStyle.fontSize,
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

  const viewBox = {
    minY: -(state.upmAscender || 0) - halfLeading,
    width: visualizerData.viewBoxWidth,
    height: unitsPerEm * lineHeight,
  };

  // Beräkna gap i SVG units baserat på textBBox
  const measureLineGap = (num: number) => {
    return textBBox ? ((viewBox.width - textBBox.width) / 8) * num : 0;
  };

  // Y-positions för varje linje
  const yPositions = {
    lineBoxTop: -(state.upmAscender || 0) - halfLeading,
    emBoxTop: -(state.upmAscender || 0),
    capHeight: -(state.capHeight || 0),
    xHeight: -(state.xHeight || 0),
    baseline: 0,
    emBoxBottom: -(state.upmDescender || 0),
    lineBoxBottom: -(state.upmDescender || 0) + halfLeading,
  };

  // Beräkna x-positioner baserat på textBBox
  const getLineConfig = (
    y: number,
    x1: number,
    x2: number
  ): { x1: number; x2: number; y: number } => {
    if (!textBBox) {
      // Full bredd när vi inte har textBBox än
      return {
        x1: 0,
        x2: viewBox.width,
        y,
      };
    }

    // Använd de medskickade x1/x2 värdena
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
      viewBox.width - measureLineGap(3)
    ),
    baseline: getLineConfig(
      yPositions.baseline,
      measureLineGap(2),
      viewBox.width
    ),
    emBoxBottom: getLineConfig(
      yPositions.emBoxBottom,
      measureLineGap(1),
      viewBox.width - measureLineGap(2)
    ),
    lineBoxBottom: getLineConfig(yPositions.lineBoxBottom, 0, viewBox.width),
  };

  return (
    <div ref={elemRef} className={classNames(styles['metrics-visualizer'])}>
      <MetricsVisualizerSVG
        viewBox={viewBox}
        lines={lines}
        unitsPerEm={state.unitsPerEm || 0}
        fontFamily={state.fontFamily || 'sans-serif'}
        vizText={visualizerData.vizText}
        onTextBBoxUpdate={setTextBBox}
      />
    </div>
  );
};
