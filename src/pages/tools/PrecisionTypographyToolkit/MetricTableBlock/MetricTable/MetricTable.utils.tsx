import type { FontMetricsState } from '../../context';
import type { MetricRow } from './MetricTable.types';

/**
 * Maps table row IDs to their corresponding visualizer metric keys.
 *
 * Used to determine which metric should be highlighted in the SVG visualizer
 * when a table row is clicked. Metrics with `null` values cannot be visualized.
 *
 * @constant
 * @type {Record<string, string | null>}
 *
 * @example
 * ```ts
 * const visualizerKey = tableToVisualizerMap['capHeight']; // 'capHeight'
 * const noVisualization = tableToVisualizerMap['fontFamily']; // null
 * ```
 */
export const tableToVisualizerMap: Record<string, string | null> = {
  fontFamily: null,
  subFamily: null,
  category: null,
  emBox: 'emBox',
  lineBox: 'lineBox',
  avgCharWidth: null,
  capHeight: 'capHeight',
  xHeight: 'xHeight',
  ascender: 'ascender',
  descender: 'descender',
  topTrim: 'topTrim',
  bottomTrim: 'bottomTrim',
  lsbAdjust: 'lsbAdjust',
  rsbAdjust: 'rsbAdjust',
};

/**
 * Builds the metrics data array for table display.
 *
 * Transforms the current font metrics state into table rows with formatted
 * raw values, normalized CSS values, and descriptive comments.
 *
 * @param {FontMetricsState} state - Current font metrics from context
 * @returns {MetricRow[]} Array of metric rows ready for table rendering
 *
 * @example
 * ```ts
 * const { state } = useFontMetrics();
 * const tableData = buildMetricsData(state);
 * // Returns array with fontFamily, capHeight, xHeight, etc.
 * ```
 */
export const buildMetricsData = (state: FontMetricsState): MetricRow[] => [
  {
    id: 'fontFamily',
    metric: 'Font Family',
    rawValue: state.fontFamily ?? '-',
    normalizedValue: '-',
    comment: 'The name of the typeface family',
  },
  {
    id: 'subFamily',
    metric: 'Subfamily',
    rawValue: state.subFamily ?? '-',
    normalizedValue: '-',
    comment: 'The specific weight or style',
  },
  {
    id: 'category',
    metric: (
      <>
        Category<sup>1</sup>
      </>
    ),
    rawValue: state.category ?? '-',
    normalizedValue: '-',
    comment: 'The specific stylistic group the font belongs to',
  },
  {
    id: 'lineBox',
    metric: 'Line Height',
    rawValue: state.lineHeightMultiplier
      ? state.lineHeightMultiplier * (state.unitsPerEm || 1)
      : '-',
    normalizedValue: state.lineHeightMultiplier ?? '-',
    comment: 'The vertical space occupied by a line of text',
  },
  {
    id: 'emBox',
    metric: 'Units per Em',
    rawValue: state.unitsPerEm ?? '-',
    normalizedValue: state.unitsPerEm ? '1em' : '-',
    comment: 'The grid resolution of the font file',
  },
  {
    id: 'avgCharWidth',
    metric: 'Avg. Char. Width',
    rawValue: state.avgCharWidth ?? '-',
    normalizedValue: state.avgCharWidth
      ? String(state.avgCharWidthRatio + 'em')
      : '-',
    comment: 'The average width of font glyphs',
  },
  {
    id: 'capHeight',
    metric: 'Cap Height',
    rawValue: state.capHeight ?? '-',
    normalizedValue: state.capHeight
      ? String(state.capHeightRatio + 'em')
      : '-',
    comment: 'Height of a capital letter (flat top)',
  },
  {
    id: 'xHeight',
    metric: 'x-Height',
    rawValue: state.xHeight ?? '-',
    normalizedValue: state.xHeight ? String(state.xHeightRatio + 'em') : '-',
    comment: 'Height of lowercase letters (like x)',
  },
  {
    id: 'ascender',
    metric: 'Ascender (hhea)',
    rawValue: state.hheaAscender ?? '-',
    normalizedValue: state.hheaAscender
      ? String(state.hheaAscenderRatio + 'em')
      : '-',
    comment: `The highest point of the font's layout box`,
  },
  {
    id: 'descender',
    metric: 'Descender (hhea)',
    rawValue: state.hheaDescender ?? '-',
    normalizedValue: state.hheaDescender
      ? String(state.hheaDescenderRatio + 'em')
      : '-',
    comment: 'The lowest point of the layout box',
  },
  {
    id: 'topTrim',
    metric: 'Top Trim',
    rawValue: state.topTrimRaw ? (
      <span>
        {state.topTrimRaw} + {state.halfLeading}
        <sup>2</sup>
      </span>
    ) : (
      '-'
    ),
    normalizedValue: state.topTrimRatio
      ? String(state.topTrimRatio + 'em')
      : '-',
    comment: 'The trim space between cap-height and top of line-box',
  },
  {
    id: 'bottomTrim',
    metric: 'Bottom Trim',
    rawValue: state.bottomTrimRaw ? (
      <span>
        {state.bottomTrimRaw} + {state.halfLeading}
        <sup>2</sup>
      </span>
    ) : (
      '-'
    ),
    normalizedValue: state.bottomTrimRatio
      ? String(state.bottomTrimRatio + 'em')
      : '-',
    comment: 'The trim space between baseline and bottom of line-box',
  },
  {
    id: 'lsbAdjust',
    metric: 'Left Side Bearing',
    rawValue: state.lsbAdjustRaw ? state.lsbAdjustRaw : '-',
    normalizedValue: state.lsbAdjustRatio
      ? String(state.lsbAdjustRatio + 'em')
      : '-',
    comment: 'The average trim space for the left optical edge',
  },
  {
    id: 'rsbAdjust',
    metric: 'Right Side Bearing',
    rawValue: state.rsbAdjustRaw ? state.rsbAdjustRaw : '-',
    normalizedValue: state.rsbAdjustRatio
      ? String(state.rsbAdjustRatio + 'em')
      : '-',
    comment: 'The average trim space for the right optical edge',
  },
];
