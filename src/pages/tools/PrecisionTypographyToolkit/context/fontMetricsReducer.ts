import { setItem } from '@/utils/localStorage';
import type {
  FontMetricsState,
  FontMetricsAction,
} from './FontMetricsContext.types';
import { initialFontMetricsState } from './FontMetricsContext.types';
import type { FontMetrics } from '@models';

/**
 * Prepare font metrics state from parsed font data
 *
 * Converts FontMetrics to FontMetricsState by:
 * - Mapping property names to state structure
 * - Calculating all normalized ratios (0-1)
 * - Ensuring descender values are negative in raw metrics
 * - Ensuring all ratios are positive
 *
 * @param file - The uploaded font file
 * @param metrics - Parsed font metrics from parseFontFile
 * @param loadedFontFamily - The dynamically loaded font-family name
 * @returns Complete FontMetricsState ready for reducer
 */
export const prepareFontMetricsState = (
  file: File,
  metrics: FontMetrics,
  loadedFontFamily: string
): FontMetricsState => {
  const { unitsPerEm } = metrics;

  return {
    // Font file info
    fontFile: file,
    fontFamily: loadedFontFamily, // Use the loaded font-family name, not metrics.familyName
    subFamily: metrics.subFamilyName,
    category: metrics.category,

    // Raw metrics (i UPM units, descender negative)
    unitsPerEm: metrics.unitsPerEm,
    hheaAscender: metrics.hheaAscender,
    hheaDescender: metrics.hheaDescender, // already negative from parser
    upmAscender: metrics.upmAscender ?? null,
    upmDescender: metrics.upmDescender ?? null, // already negative from parser
    capHeight: metrics.capHeight,
    xHeight: metrics.xHeight,
    avgCharWidth: metrics.avgCharWidth,
    lineGap: metrics.lineGap,
    topTrim: metrics.topTrim ?? null,
    bottomTrim: metrics.bottomTrim ?? null,

    // Normalized metrics (0-1, all positive)
    capHeightRatio: metrics.capHeight / unitsPerEm,
    xHeightRatio: metrics.xHeight / unitsPerEm,
    avgCharWidthRatio: metrics.avgCharWidth / unitsPerEm,
    hheaAscenderRatio: metrics.hheaAscender
      ? metrics.hheaAscender / unitsPerEm
      : null,
    hheaDescenderRatio: metrics.hheaDescender
      ? metrics.hheaDescender / unitsPerEm
      : null,
    ascenderRatio: metrics.upmAscender
      ? metrics.upmAscender / unitsPerEm
      : null,
    descenderRatio: metrics.upmDescender
      ? Math.abs(metrics.upmDescender) / unitsPerEm
      : null,
    topTrimRatio: metrics.topTrim ? metrics.topTrim / unitsPerEm : null,
    bottomTrimRatio: metrics.bottomTrim
      ? metrics.bottomTrim / unitsPerEm
      : null,

    // UI state
    isLoading: false,
    error: null,
  };
};

/**
 * Font metrics reducer
 *
 * Handles state transitions for font upload, parsing, and normalization.
 */
export const fontMetricsReducer = (
  state: FontMetricsState,
  action: FontMetricsAction
): FontMetricsState => {
  switch (action.type) {
    case 'FONT_UPLOAD_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'FONT_UPLOAD_SUCCESS': {
      const { fontFile: _, ...stateToSave } = action.payload;
      setItem('fontMetrics', stateToSave);

      return {
        ...action.payload,
        isLoading: false,
        error: null,
      };
    }

    case 'RESTORE_FROM_STORAGE':
      return {
        ...action.payload,
        fontFile: null,
      };

    case 'FONT_UPLOAD_ERROR':
      return {
        ...initialFontMetricsState,
        isLoading: false,
        error: action.payload,
      };

    case 'RESET_FONT':
      return initialFontMetricsState;

    default:
      return state;
  }
};
