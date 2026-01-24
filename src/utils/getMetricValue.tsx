import type { FontMetricsState } from '@/pages/tools/PrecisionTypographyToolkit/context';

/**
 * Get formatted metric value with accessibility support
 *
 * Returns a React node containing dual-format metric values optimized for both
 * visual display and screen reader accessibility:
 * - **Visual text** (`aria-hidden="true"`): Compact notation using symbols (/, upm)
 * - **Screen reader text** (`.sr-only`): Descriptive text using full words
 *
 * ## Accessibility Features
 * - Dual text rendering for optimal UX across all users
 * - Screen reader text uses "out of" instead of "/" for clarity
 * - Full words "units per em" instead of abbreviation "upm"
 * - "equals" to show mathematical relationship between UPM and em values
 * - Negative values explicitly stated as "negative" for clarity
 *
 * ## Visual Format Patterns
 * - **Line Box**: `1500 / 1000upm, 1.50`
 * - **Em Box**: `1000 upm, 1em`
 * - **Cap Height**: `700 / 1000upm, 0.700em`
 * - **Descender**: `-250 / 1000upm, -0.250em`
 * - **Top Trim**: `(194 + 250) / 1000upm, -0.444em`
 * - **LSB/RSB Adjust**: `50 / 1000upm, -0.0500em`
 *
 * ## Screen Reader Format Patterns
 * - **Cap Height**: "700 out of 1000 units per em equals 0.700 em"
 * - **Descender**: "negative 250 out of 1000 units per em equals negative 0.250 em"
 * - **Top Trim**: "444 out of 1000 units per em equals negative 0.444 em. Calculated from metric trim top 194 plus half leading 250."
 * - **LSB Adjust**: "50 out of 1000 units per em equals negative 0.0500 em, calculated from an average of 10 commonly used lowercase letters"
 *
 * @param metricId - The metric identifier (e.g. 'capHeight', 'xHeight', 'lineBox')
 * @param state - FontMetricsState containing all font metrics and calculated ratios
 * @returns React node with dual-format text (visual + screen reader accessible)
 *
 * @example
 * ```tsx
 * // Visual output: "700 / 1000upm, 0.700em"
 * // Screen reader: "700 out of 1000 units per em equals 0.700 em"
 * getMetricValue('capHeight', state)
 * ```
 *
 * @example
 * ```tsx
 * // Visual output: "(194 + 250) / 1000upm, -0.444em"
 * // Screen reader: "444 out of 1000 units per em equals negative 0.444 em.
 * //                 Calculated from metric trim top 194 plus half leading 250."
 * getMetricValue('topTrim', state)
 * ```
 */
export const getMetricValue = (
  metricId: string,
  state: FontMetricsState
): React.ReactNode => {
  const upm = state.unitsPerEm || 1000;
  const valueWeight = 'font-weight-medium';

  // const renderMath = (math: string) => (
  //   <span className="color-text-secondary">({math})</span>
  // );

  switch (metricId) {
    case 'lineBox':
      return (
        <>
          <span className={valueWeight} aria-hidden="true">
            {`${state.lineHeightMultiplier * upm} / ${upm}upm, ${state.lineHeightMultiplier}`}
          </span>

          <span className="sr-only">
            {`${state.lineHeightMultiplier * upm} out of ${upm} units per em equals ${state.lineHeightMultiplier}`}
          </span>
        </>
      );

    case 'emBox':
      return (
        <>
          <span
            className={valueWeight}
            aria-hidden="true"
          >{`${upm} upm, 1em`}</span>
          <span className="sr-only">{`${upm} units per em equals 1 em`}</span>
        </>
      );

    case 'capHeight':
      return (
        <>
          <span className={valueWeight} aria-hidden="true">
            {`${state.capHeight} / ${upm}upm, ${(state.capHeightRatio || 0).toFixed(3)}em`}
          </span>
          <span className="sr-only">
            {`${state.capHeight} out of ${upm} units per em equals ${(state.capHeightRatio || 0).toFixed(3)} em`}
          </span>
        </>
      );

    case 'xHeight':
      return (
        <>
          <span className={valueWeight} aria-hidden="true">
            {`${state.xHeight} / ${upm}upm, ${(state.xHeightRatio || 0).toFixed(3)}em`}
          </span>
          <span className="sr-only">
            {`${state.xHeight} out of ${upm} units per em equals ${(state.xHeightRatio || 0).toFixed(3)} em`}
          </span>
        </>
      );

    case 'ascender':
      return (
        <>
          <span className={valueWeight} aria-hidden="true">
            {`${state.hheaAscender} / ${upm}upm, ${(state.ascenderRatio || 0).toFixed(3)}em`}
          </span>
          <span className="sr-only">
            {`${state.hheaAscender} out of ${upm} units per em equals ${(state.ascenderRatio || 0).toFixed(3)} em`}
          </span>
        </>
      );

    case 'descender':
      return (
        <>
          <span className={valueWeight} aria-hidden="true">
            {`${state.hheaDescender} / ${upm}upm, -${(state.descenderRatio || 0).toFixed(3)}em`}
          </span>
          <span className="sr-only">
            {`negative ${Math.abs(state.hheaDescender || 0)} out of ${upm} units per em equals negative ${(state.descenderRatio || 0).toFixed(3)} em`}
          </span>
        </>
      );

    case 'topTrim':
      return (
        <>
          <span className={valueWeight} aria-hidden="true">
            {`(${state.topTrimRaw} + ${state.halfLeading}) / ${upm}upm, ${(state.topTrimRatio || 0).toFixed(3)}em`}
          </span>
          <span className="sr-only">
            {`${(state.topTrimRaw || 0) + state.halfLeading} out of ${upm} units per em equals negative ${(state.topTrimRatio || 0).toFixed(3)} em. Calculated from metric trim top ${state.topTrimRaw} plus half leading ${state.halfLeading}.`}
          </span>
        </>
      );

    case 'bottomTrim':
      return (
        <>
          <span className={valueWeight} aria-hidden="true">
            {`(${state.bottomTrimRaw} + ${state.halfLeading}) / ${upm}upm, ${(state.bottomTrimRatio || 0).toFixed(3)}em`}
          </span>
          <span className="sr-only">
            {`${(state.bottomTrimRaw || 0) + state.halfLeading} out of ${upm} units per em equals negative ${(state.bottomTrimRatio || 0).toFixed(3)} em. Calculated from metric trim bottom ${state.bottomTrimRaw} plus half leading ${state.halfLeading}.`}
          </span>
        </>
      );
    case 'lsbAdjust':
      return (
        <>
          <span className={valueWeight} aria-hidden="true">
            {`${state.lsbAdjustRaw} / ${upm}upm, ${(state.lsbAdjustRatio || 0).toFixed(4)}em`}
          </span>
          <span className="sr-only">
            {`${state.lsbAdjustRaw} out of ${upm} units per em equals ${-(state.lsbAdjustRatio || 0).toFixed(4)} em, calculated from an average of 10 commonly used lowercase letters`}
          </span>
        </>
      );
    case 'rsbAdjust':
      return (
        <>
          <span className={valueWeight} aria-hidden="true">
            {`${state.rsbAdjustRaw} / ${upm}upm, ${(state.rsbAdjustRatio || 0).toFixed(4)}em`}
          </span>
          <span className="sr-only">
            {`${state.rsbAdjustRaw} out of ${upm} units per em equals ${-(state.rsbAdjustRatio || 0).toFixed(4)} em, calculated from an average of 10 commonly used lowercase letters`}
          </span>
        </>
      );

    default:
      return 'Unknown metric';
  }
};
