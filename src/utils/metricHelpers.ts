import type { FontMetricsState } from '@/pages/tools/PrecisionTypographyToolkit/context';

/**
 * Human-readable names for font metrics
 *
 * Maps metric IDs to display names used in the UI.
 * Used for labeling selected metrics and in tooltips.
 *
 * @example
 * ```ts
 * const displayName = MetricsNiceName['capHeight']; // "Cap Height"
 * ```
 */
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

/**
 * Get formatted metric value string
 *
 * Formats a font metric value for display, showing both absolute UPM units
 * and relative em values. Returns "N/A" if the metric is not available.
 *
 * Format patterns:
 * - Line Height: `1.50 (1500 / 1000upm)`
 * - Other metrics: `700 / 1000upm (0.700em)`
 * - Em Box: `1000 UPM (1em)`
 *
 * @param metricId - The metric identifier (e.g. 'capHeight', 'xHeight')
 * @param state - FontMetricsState containing all font metrics
 * @param lineHeight - Optional line-height multiplier (required for 'lineBox')
 * @returns Formatted string with metric value in UPM and em units
 *
 * @example
 * ```ts
 * getMetricValue('capHeight', state)
 * // Returns: "700 / 1000upm (0.700em)"
 *
 * getMetricValue('lineBox', state, 1.5)
 * // Returns: "1.50 (1500 / 1000upm)"
 * ```
 */
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
        ? `${state.hheaAscender} / ${upm}upm (${state.hheaAscenderRatio}em)`
        : 'N/A';

    case 'descender':
      return state.hheaDescender
        ? `${state.hheaDescender} / ${upm}upm (${state.hheaDescenderRatio}em)`
        : 'N/A';

    case 'emBox':
      return `${upm} UPM (1em)`;

    case 'capHeight':
      return state.capHeight
        ? `${state.capHeight} / ${upm}upm (${state.capHeightRatio}em)`
        : 'N/A';

    case 'xHeight':
      return state.xHeight
        ? `${state.xHeight} / ${upm}upm (${state.xHeightRatio}em)`
        : 'N/A';

    case 'topTrim':
      return state.topTrim
        ? `${state.topTrim} / ${upm}upm (${state.topTrimRatio}em)`
        : 'N/A';

    case 'bottomTrim':
      return state.bottomTrim
        ? `${state.bottomTrim} / ${upm}upm (${state.bottomTrimRatio}em)`
        : 'N/A';

    default:
      return 'Unknown metric';
  }
};
