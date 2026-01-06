import type { FontMetricsState } from '@/pages/tools/PrecisionTypographyToolkit/context';

export const MetricsNiceName: Record<string, string> = {
  lineBox: 'Line Height',
  ascender: 'Ascender (HHEA)',
  emBox: 'Em Box',
  capHeight: 'Cap Height',
  xHeight: 'x-Height',
  descender: 'Descender (HHEA)',
  topTrim: 'Top Trim',
  bottomTrim: 'Bottom Trim',
};

export const getMetricValue = (
  metricId: string,
  state: FontMetricsState,
  lineHeight?: number
): string => {
  const upm = state.unitsPerEm || 1000;

  switch (metricId) {
    case 'lineBox':
      if (!lineHeight) return 'N/A';
      return `${lineHeight.toFixed(2)} (${(upm * lineHeight).toFixed(0)} / ${upm}upm)`;

    case 'ascender':
      return state.hheaAscender
        ? `${state.hheaAscender} / ${upm}upm (${(state.hheaAscender / upm).toFixed(3)}em)`
        : 'N/A';

    case 'descender':
      return state.hheaDescender
        ? `${state.hheaDescender} / ${upm}upm (${(state.hheaDescender / upm).toFixed(3)}em)`
        : 'N/A';

    case 'emBox':
      return `${upm} UPM (1em)`;

    case 'capHeight':
      return state.capHeight
        ? `${state.capHeight} / ${upm}upm (${state.capHeightRatio?.toFixed(3)}em)`
        : 'N/A';

    case 'xHeight':
      return state.xHeight
        ? `${state.xHeight} / ${upm}upm (${state.xHeightRatio?.toFixed(3)}em)`
        : 'N/A';

    case 'topTrim':
      return state.topTrim
        ? `${state.topTrim} / ${upm}upm (${state.topTrimRatio?.toFixed(3)}em)`
        : 'N/A';

    case 'bottomTrim':
      return state.bottomTrim
        ? `${state.bottomTrim} / ${upm}upm (${state.bottomTrimRatio?.toFixed(3)}em)`
        : 'N/A';

    default:
      return 'Unknown metric';
  }
};
