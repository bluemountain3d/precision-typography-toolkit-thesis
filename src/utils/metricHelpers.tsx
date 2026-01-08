import type { FontMetricsState } from '@/pages/tools/PrecisionTypographyToolkit/context';
import type React from 'react';

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
  fontFamily: 'Font Family',
  subFamily: 'Subfamily',
  category: 'Category',
  unitsPerEm: 'Units per Em',
  lineBox: 'Line Height',
  ascender: 'Ascender (HHEA)',
  emBox: 'Em Box',
  capHeight: 'Cap Height',
  xHeight: 'x-Height',
  descender: 'Descender (HHEA)',
  topTrim: 'Top Trim',
  bottomTrim: 'Bottom Trim',
  avgCharWidth: 'Avg. Char. Width',
};

export const isMetricVisualized = (metricId: string): boolean => {
  const visualizedMetrics = [
    'lineBox',
    'ascender',
    'emBox',
    'capHeight',
    'xHeight',
    'descender',
    'topTrim',
    'bottomTrim',
  ];
  return visualizedMetrics.includes(metricId);
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
  state: FontMetricsState
): React.ReactNode => {
  const upm = state.unitsPerEm || 1000;
  const valueWeight = 'font-weight-medium';

  const renderMath = (math: string) => (
    <span className="color-text-secondary">({math})</span>
  );

  switch (metricId) {
    case 'lineBox':
      return (
        <>
          <span className={valueWeight}>
            {state.lineHeightMultiplier.toFixed(2)}
          </span>
          {renderMath(
            `${Math.round(upm * state.lineHeightMultiplier)} / ${upm}upm`
          )}
        </>
      );

    case 'emBox':
      return (
        <>
          <span className={valueWeight}>1em</span> {renderMath(`${upm} UPM`)}
        </>
      );

    case 'capHeight':
      return (
        <>
          <span className={valueWeight}>
            {(state.capHeightRatio || 0).toFixed(3)}em
          </span>
          {renderMath(`${state.capHeight} / ${upm}upm`)}
        </>
      );

    case 'xHeight':
      return (
        <>
          <span className={valueWeight}>
            {(state.xHeightRatio || 0).toFixed(3)}em
          </span>
          {renderMath(`${state.xHeight} / ${upm}upm`)}
        </>
      );

    case 'ascender':
      return (
        <>
          <span className={valueWeight}>
            {(state.ascenderRatio || 0).toFixed(3)}em
          </span>
          {renderMath(`${state.hheaAscender} / ${upm}upm`)}
        </>
      );

    case 'descender':
      return (
        <>
          <span className={valueWeight}>
            {-(state.descenderRatio || 0).toFixed(3)}em
          </span>
          {renderMath(`${state.hheaDescender} / ${upm}upm`)}
        </>
      );

    case 'topTrim':
      return (
        <>
          <span className={valueWeight}>
            {(state.topTrimRatio || 0).toFixed(3)}em
          </span>
          {renderMath(
            `(${state.topTrimRaw} + ${state.halfLeading}) / ${upm}upm`
          )}
        </>
      );

    case 'bottomTrim':
      return (
        <>
          <span className={valueWeight}>
            {(state.bottomTrimRatio || 0).toFixed(3)}em
          </span>
          {renderMath(
            `(${state.bottomTrimRaw} + ${state.halfLeading}) / ${upm}upm`
          )}
        </>
      );

    default:
      return 'Unknown metric';
  }
};
