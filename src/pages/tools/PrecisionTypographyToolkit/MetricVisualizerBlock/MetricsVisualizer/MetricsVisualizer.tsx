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
  console.log(elemRef.current?.style.fontSize);

  const [visualizerData, setVisualizerData] = useState({
    fontSize: '',
    width: 0,
    viewBoxWidth: 0,
    vizText: '',
  });
  const { state, dispatch } = useFontMetrics();

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

    console.log('font-size', visualizerData.fontSize);

    updateVisualizerData();

    window.addEventListener('resize', updateVisualizerData);
    return () => window.removeEventListener('resize', updateVisualizerData);
  }, [state.unitsPerEm, isMobile, isDesktop]);

  const unitsPerEm = state.unitsPerEm || 1000;
  const halfLeading = (unitsPerEm * (lineHeight - 1)) / 2;
  const textWidth = visualizerData.width;
  // const fontFamily = state.fontFamily || 'sans-serif';

  // const minY = -(state.upmAscender || 0) - halfLeading;
  // const viewBoxHeight = unitsPerEm * lineHeight;

  // Em-box positions
  // const emBoxTop = -(state.upmAscender || 0);
  // const emBoxBottom = -(state.upmDescender || 0);

  // Line-box positions
  // const lineBoxTop = emBoxTop - halfLeading;
  // const lineBoxBottom = emBoxBottom + halfLeading;

  // Glyph metrics
  // const capHeight = -(state.capHeight || 0);
  // const xHeight = -(state.xHeight || 0);

  const viewBox = {
    minY: -(state.upmAscender || 0) - halfLeading,
    width: visualizerData.viewBoxWidth,
    height: unitsPerEm * lineHeight,
  };
  const lines = {
    lineBoxTop: -(state.upmAscender || 0) - halfLeading,
    emBoxTop: -(state.upmAscender || 0),
    capHeight: -(state.capHeight || 0),
    xHeight: -(state.xHeight || 0),
    baseline: 0,
    emBoxBottom: -(state.upmDescender || 0),
    lineBoxBottom: -(state.upmDescender || 0) + halfLeading,
  };

  return (
    <div ref={elemRef} className={classNames(styles['metrics-visualizer'])}>
      <MetricsVisualizerSVG
        viewBox={viewBox}
        lines={lines}
        unitsPerEm={state.unitsPerEm || 0}
        fontFamily={state.fontFamily || 'sans-serif'}
        vizText={visualizerData.vizText}
      />
    </div>
  );
};
