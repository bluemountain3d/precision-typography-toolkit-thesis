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
  lsbAdjust: 'Left Side Bearing Adjust',
  rsbAdjust: 'Right Side Bearing Adjust',
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
    'lsbAdjust',
    'rsbAdjust',
  ];
  return visualizedMetrics.includes(metricId);
};

interface MetricDialogInfo {
  title: string;
  leadIn: string;
  getRaw: (state: FontMetricsState) => string;
  getRawCopy?: (state: FontMetricsState) => string;
  getCss: (state: FontMetricsState) => string;
  getCssCopy?: (state: FontMetricsState) => string;
  info: React.ReactNode;
  formula?: string;
}

export const metricDialogData: Record<string, MetricDialogInfo> = {
  fontFamily: {
    title: MetricsNiceName['fontFamily'],
    leadIn: 'The name of the typeface family',
    getRaw: (state) => state.fontFamily ?? '-',
    getCss: (state) => (state.fontFamily ? `"${state.fontFamily}"` : '-'),
    getCssCopy: (state) => {
      if (!state.fontFamily || !state.category) return '-';
      return `--family-${state.fontSlug}: "${state.fontFamily}", ${state.category}`;
    },
    // state.fontFamily
    //   ? `font-family: "${state.fontFamily}", ${state.category};`
    //   : '-',
    info: 'A font family is a set of related fonts that share a common design, such as Arial or Times New Roman. It includes variations (Sub Families) like bold, italic, and light. In web design, it ensures a consistent look by grouping these styles under one name for the browser to recognize',
  },

  subFamily: {
    title: MetricsNiceName['subFamily'],
    leadIn: 'The specific weight or style',
    getRaw: (state) => state.subFamily ?? '-',
    getCss: (state) =>
      state.weightClass
        ? `${state.weightClass}${state.subFamily?.toLowerCase().match(/italic|oblique/) ? ', italic' : ''}`
        : (state.subFamily ?? '-'),
    getCssCopy: (state) => {
      if (!state.weightClass) return state.subFamily ?? '-';

      const isItalic = state.subFamily?.toLowerCase().match(/italic|oblique/);
      const weightName =
        state.subFamily
          ?.toLowerCase()
          .replace(/italic|oblique/g, '')
          .trim()
          .replace(/\s+/g, '-') || 'regular';

      const font = state.fontSlug;

      const weightVar = `--weight-${font}-${weightName}: ${state.weightClass};`;
      const styleVar = isItalic ? `\n--style-${font}-italic: italic;` : '';

      return `${weightVar}${styleVar}`;
    },
    info: 'A specific variant within a font family, such as Regular, Italic, or Bold. It defines the visual weight and slant. In CSS, this typically maps to "font-weight" and "font-style" properties.',
  },

  category: {
    title: MetricsNiceName['category'],
    leadIn: 'The specific stylistic group the font belongs to',
    getRaw: (state) => state.category ?? '-',
    getCss: (state) => (state.category ? `${state.category}` : '-'),
    info: 'A classification based on stylistic features, such as Serif, Sans-Serif, Monospace, or Display. These categories help browsers and designers choose fallback fonts that maintain the intended aesthetic.',
  },

  unitsPerEm: {
    title: MetricsNiceName['unitsPerEm'],
    leadIn: 'The grid resolution of the font file',
    getRaw: (state) => state.unitsPerEm?.toString() ?? '-',
    getCss: (state) => (state.unitsPerEm ? '1em' : '-'),
    getCssCopy: (state) => {
      if (!state.unitsPerEm) return '-';
      return `--units-per-em-${state.fontSlug}: ${state.unitsPerEm};`;
    },
    info: 'The logical square (em square) used to map glyph coordinates. It defines the internal coordinate system of the font file; common values are 1000 or 2048 units.',
  },

  emBox: {
    title: MetricsNiceName['emBox'],
    leadIn: 'The grid resolution of the font file',
    getRaw: (state) => state.unitsPerEm?.toString() ?? '-',
    getCss: (state) => (state.unitsPerEm ? '1em' : '-'),
    getCssCopy: (state) => {
      if (!state.unitsPerEm) return '-';
      return `--upm-${state.fontSlug}: ${state.unitsPerEm};`;
    },
    info: 'The logical square (em square) used to map glyph coordinates. It defines the internal coordinate system of the font file; common values are 1000 or 2048 units.',
  },

  lineBox: {
    title: MetricsNiceName['lineBox'],
    leadIn: 'The vertical space occupied by a line of text',
    getRaw: (state) =>
      state.lineHeightMultiplier && state.unitsPerEm
        ? `${state.lineHeightMultiplier * state.unitsPerEm}`
        : '-',
    getCss: (state) =>
      state.lineHeightMultiplier ? `${state.lineHeightMultiplier}` : '-',
    info: 'The total vertical space a line of text occupies, calculated by the font’s metrics and line-height. It includes the visible characters plus the "leading" (padding) above and below them.',
  },

  avgCharWidth: {
    title: MetricsNiceName['avgCharWidth'],
    leadIn: 'The average width of font glyphs',
    getRaw: (state) => state.avgCharWidth?.toString() ?? '-',
    getCss: (state) =>
      state.avgCharWidth ? `${state.avgCharWidthRatio}em` : '-',
    getCssCopy: (state) => {
      if (!state.avgCharWidth) return '-';
      return `--avg-char-width-${state.fontSlug}: ${state.avgCharWidthRatio}em;`;
    },
    info: 'The average width of all glyphs in the font. In CSS, you can use this to create "ch-like" containers for fonts that don’t have a reliable ch-unit, or to estimate the width of a text string: width: calc(var(--avg-char-width) * [number of characters]).',
  },

  ascender: {
    title: MetricsNiceName['ascender'],
    leadIn: "The highest point of the font's layout box",
    getRaw: (state) => state.hheaAscender?.toString() ?? '-',
    getCss: (state) =>
      state.hheaAscenderRatio ? `${state.hheaAscenderRatio}em` : '-',
    getCssCopy: (state) => {
      if (!state.hheaAscenderRatio) return '-';
      return `--ascender-${state.fontSlug}: ${state.hheaAscenderRatio}em;`;
    },
    info: 'The distance from the baseline to the highest part of the font’s glyphs. This usually covers the tops of tall letters like "h" or "k", as well as accents on capital letters.',
  },

  capHeight: {
    title: MetricsNiceName['capHeight'],
    leadIn: 'Height of a capital letter (flat top)',
    getRaw: (state) => state.capHeight?.toString() ?? '-',
    getCss: (state) =>
      state.capHeightRatio ? `${state.capHeightRatio}em` : '-',
    getCssCopy: (state) => {
      if (!state.capHeightRatio) return '-';
      return `--cap-height-${state.fontSlug}: ${state.capHeightRatio}em;`;
    },
    info: 'The distance from the baseline to the top of flat capital letters, such as "H" or "I". It measures the height of uppercase characters excluding any decorative elements or curves.',
  },

  xHeight: {
    title: MetricsNiceName['xHeight'],
    leadIn: 'Height of lowercase letters (like x)',
    getRaw: (state) => state.xHeight?.toString() ?? '-',
    getCss: (state) => (state.xHeightRatio ? `${state.xHeightRatio}em` : '-'),
    getCssCopy: (state) => {
      if (!state.xHeightRatio) return '-';
      return `--x-height-${state.fontSlug}: ${state.xHeightRatio}em;`;
    },
    info: 'The height of the lowercase "x" and similar characters. It is a key factor in a font’s legibility; a larger x-height generally makes a typeface easier to read at small sizes.',
  },

  descender: {
    title: MetricsNiceName['descender'],
    leadIn: 'The lowest point of the layout box',
    getRaw: (state) => state.hheaDescender?.toString() ?? '-',
    getCss: (state) =>
      state.hheaDescenderRatio ? `${state.hheaDescenderRatio}em` : '-',
    getCssCopy: (state) => {
      if (!state.hheaDescenderRatio) return '-';
      return `--descender-${state.fontSlug}: ${state.hheaDescenderRatio}em;`;
    },
    info: 'The distance from the baseline to the lowest point of the font’s layout box. It accommodates the parts of letters that drop below the baseline, such as the tails on "g", "j", and "p".',
  },

  topTrim: {
    title: MetricsNiceName['topTrim'],
    leadIn: 'The trim space between cap-height and top of line-box',
    getRaw: (state) => `${state.topTrimRaw} + ${state.halfLeading}`,
    getRawCopy: (state) =>
      state.topTrimRaw
        ? `metric-top-trim: ${state.topTrimRaw}, half-leading: ${state.halfLeading}`
        : '-',
    getCss: (state) => (state.topTrimRatio ? `-${state.topTrimRatio}em` : '-'),
    getCssCopy: (state) =>
      state.topTrimRatio
        ? `--top-trim-${state.fontSlug}: calc((${state.topTrimRaw} / ${state.unitsPerEm} * -1em) - ((1lh - 1em) * 0.5))`
        : '-',
    info: 'The space between cap-height and the top of the line-box. It combines the font’s internal space (from cap-height to em-box edge) with the half-leading (extra space added by line-height). Trimming this aligns capital letters flush with the top of their container.',
  },

  bottomTrim: {
    title: MetricsNiceName['bottomTrim'],
    leadIn: 'The trim space between baseline and bottom of line-box',
    getRaw: (state) => `${state.bottomTrimRaw} + ${state.halfLeading}`,
    getRawCopy: (state) =>
      `metric-bottom-trim: ${state.bottomTrimRaw}, half-leading: ${state.halfLeading}`,
    getCss: (state) =>
      state.bottomTrimRatio ? `-${state.bottomTrimRatio}em` : '-',
    getCssCopy: (state) =>
      state.bottomTrimRatio
        ? `--bottom-trim-${state.fontSlug}: calc((${state.bottomTrimRaw} / ${state.unitsPerEm} * -1em) - ((1lh - 1em) * 0.5))`
        : '-',
    info: 'The space between the baseline and the bottom of the line-box. It combines the font’s internal space (from baseline to em-box edge) with the half-leading. Trimming this allows the text to sit flush at the bottom, removing the gap below the baseline.',
  },

  lsbAdjust: {
    title: MetricsNiceName['lsbAdjust'],
    leadIn: 'The average trim space for the left optical edge',
    getRaw: (state) => `${state.lsbAdjustRaw}`,
    getCss: (state) =>
      state.lsbAdjustRatio ? `-${state.lsbAdjustRatio}em` : '-',
    getCssCopy: (state) =>
      state.lsbAdjustRatio
        ? `--lsb-adjust-${state.fontSlug}: -${state.lsbAdjustRatio}em;`
        : '-',
    info: 'The average Left Side Bearing (LSB) calculated from flat characters (e.g., h, n, l). Fonts have built-in spacing to prevent letters from touching. Trimming this gap allows the visible ink to align perfectly flush with the left edge of the container.',
  },

  rsbAdjust: {
    title: MetricsNiceName['rsbAdjust'],
    leadIn: 'The average trim space for the right optical edge',
    getRaw: (state) => `${state.rsbAdjustRaw}`,
    getCss: (state) =>
      state.rsbAdjustRatio ? `-${state.rsbAdjustRatio}em` : '-',
    getCssCopy: (state) =>
      state.rsbAdjustRatio
        ? `--rsb-adjust-${state.fontSlug}: -${state.rsbAdjustRatio}em;`
        : '-',
    info: 'The average Right Side Bearing (RSB). Similar to the left adjustment, this removes the built-in spacing on the right side. Trimming this is useful for right-aligned text or for calculating the precise optical width of a text block.',
  },

  // TODO : ADD LSB AND RSB ADJUST
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
            `${Math.round(upm * state.lineHeightMultiplier)} \u00F7 ${upm}upm`
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
          {renderMath(`${state.capHeight} \u00F7 ${upm}upm`)}
        </>
      );

    case 'xHeight':
      return (
        <>
          <span className={valueWeight}>
            {(state.xHeightRatio || 0).toFixed(3)}em
          </span>
          {renderMath(`${state.xHeight} \u00F7 ${upm}upm`)}
        </>
      );

    case 'ascender':
      return (
        <>
          <span className={valueWeight}>
            {(state.ascenderRatio || 0).toFixed(3)}em
          </span>
          {renderMath(`${state.hheaAscender} \u00F7 ${upm}upm`)}
        </>
      );

    case 'descender':
      return (
        <>
          <span className={valueWeight}>
            {-(state.descenderRatio || 0).toFixed(3)}em
          </span>
          {renderMath(`${state.hheaDescender} \u00F7 ${upm}upm`)}
        </>
      );

    case 'topTrim':
      return (
        <>
          <span className={valueWeight}>
            {(state.topTrimRatio || 0).toFixed(3)}em
          </span>
          {renderMath(
            `(${state.topTrimRaw} + ${state.halfLeading}) \u00F7 ${upm}upm`
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
            `(${state.bottomTrimRaw} + ${state.halfLeading}) \u00F7 ${upm}upm`
          )}
        </>
      );
    case 'lsbAdjust':
      return (
        <>
          <span className={valueWeight}>
            {-(state.lsbAdjustRatio || 0).toFixed(4)}em
          </span>
          {renderMath(
            `${state.lsbAdjustRaw} = f(h, m, ...) \u00F7 -${state.unitsPerEm}upm`
          )}
        </>
      );
    case 'rsbAdjust':
      return (
        <>
          <span className={valueWeight}>
            {-(state.rsbAdjustRatio || 0).toFixed(4)}em
          </span>
          {renderMath(
            `${state.rsbAdjustRaw} = f(h, m, ...) \u00F7 -${state.unitsPerEm}upm`
          )}
        </>
      );

    default:
      return 'Unknown metric';
  }
};
