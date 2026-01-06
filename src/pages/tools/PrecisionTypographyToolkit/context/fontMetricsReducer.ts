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

  const round3 = (val: number | null | undefined): number | null => {
    if (val === null || val === undefined) return null;
    return Math.round(val * 1000) / 1000;
  };

  return {
    // UI state
    selectedMetric: null,

    // Font file info
    fontFile: file,
    fontFamily: metrics.familyName, // Original font name for display
    loadedFontFamily: loadedFontFamily, // CSS font-family name for rendering
    subFamily: metrics.subFamilyName,
    category: metrics.category,

    // Raw metrics (in UPM units, descender negative)
    unitsPerEm: metrics.unitsPerEm,
    hheaAscender: metrics.hheaAscender,
    hheaDescender: metrics.hheaDescender, // already negative from parser
    upmAscender: metrics.upmAscender ?? null,
    upmDescender: metrics.upmDescender ?? null, // already negative from parser
    capHeight: metrics.capHeight,
    xHeight: metrics.xHeight,
    avgCharWidth: metrics.avgCharWidth,
    lineGap: metrics.lineGap,
    topTrimRaw: metrics.topTrimRaw ?? null,
    bottomTrimRaw: metrics.bottomTrimRaw ?? null,
    
    // Dynamic trim values (initialized with default line-height 1.5)
    topTrim: metrics.topTrimRaw !== null && metrics.topTrimRaw !== undefined
      ? Math.round(((1.5 * unitsPerEm - unitsPerEm) / 2) + metrics.topTrimRaw)
      : null,
    bottomTrim: metrics.bottomTrimRaw !== null && metrics.bottomTrimRaw !== undefined
      ? Math.round(((1.5 * unitsPerEm - unitsPerEm) / 2) + metrics.bottomTrimRaw)
      : null,

    // Normalized metrics (0-1, all positive)
    capHeightRatio: round3(metrics.capHeight / unitsPerEm),
    xHeightRatio: round3(metrics.xHeight / unitsPerEm),
    avgCharWidthRatio: round3(metrics.avgCharWidth / unitsPerEm),

    hheaAscenderRatio: metrics.hheaAscender
      ? round3(metrics.hheaAscender / unitsPerEm)
      : null,

    hheaDescenderRatio: metrics.hheaDescender
      ? round3(metrics.hheaDescender / unitsPerEm)
      : null,

    ascenderRatio: metrics.upmAscender
      ? round3(metrics.upmAscender / unitsPerEm)
      : null,

    descenderRatio: metrics.upmDescender
      ? round3(Math.abs(metrics.upmDescender) / unitsPerEm)
      : null,

    topTrimRawRatio: metrics.topTrimRaw ? round3(metrics.topTrimRaw / unitsPerEm) : null,

    bottomTrimRawRatio: metrics.bottomTrimRaw
      ? round3(metrics.bottomTrimRaw / unitsPerEm)
      : null,

    // Dynamic trim ratios (initialized with line-height 1.5)
    topTrimRatio: metrics.topTrimRaw !== null && metrics.topTrimRaw !== undefined
      ? round3((((1.5 * unitsPerEm - unitsPerEm) / 2) + metrics.topTrimRaw) / unitsPerEm)
      : null,
    
    bottomTrimRatio: metrics.bottomTrimRaw !== null && metrics.bottomTrimRaw !== undefined
      ? round3((((1.5 * unitsPerEm - unitsPerEm) / 2) + metrics.bottomTrimRaw) / unitsPerEm)
      : null,

    // UI state
    isLoading: false,
    error: null,
  };
};

/**
 * Font metrics reducer
 *
 * Manages font metrics state transitions through actions:
 * - SET_SELECTED_METRIC: Updates the currently selected metric for visualization
 * - FONT_UPLOAD_START: Sets loading state during font processing
 * - FONT_UPLOAD_SUCCESS: Stores parsed font metrics and persists to localStorage
 * - FONT_UPLOAD_ERROR: Resets to initial state with error message
 * - RESTORE_FROM_STORAGE: Restores saved metrics (without File object)
 * - RESET_FONT: Clears all font data and returns to initial state
 *
 * @param state - Current FontMetricsState
 * @param action - FontMetricsAction to perform
 * @returns Updated FontMetricsState
 */
export const fontMetricsReducer = (
  state: FontMetricsState,
  action: FontMetricsAction
): FontMetricsState => {
  switch (action.type) {
    case 'SET_SELECTED_METRIC':
      return {
        ...state,
        selectedMetric: action.payload,
      };

    case 'FONT_UPLOAD_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'FONT_UPLOAD_SUCCESS': {
      // Exclude File object from localStorage (can't be serialized)
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

    case 'UPDATE_LINE_HEIGHT_TRIMS': {
      const lineHeight = action.payload;
      const { unitsPerEm, topTrimRaw, bottomTrimRaw } = state;

      if (!unitsPerEm || topTrimRaw === null || bottomTrimRaw === null) {
        return state;
      }

      // Formula: ((lineHeight * unitsPerEm - unitsPerEm) / 2) + topTrimRaw
      const halfLeading = (lineHeight * unitsPerEm - unitsPerEm) / 2;
      const topTrim = Math.round(halfLeading + topTrimRaw);
      const bottomTrim = Math.round(halfLeading + bottomTrimRaw);

      const round3 = (val: number): number => Math.round(val * 1000) / 1000;

      return {
        ...state,
        topTrim,
        bottomTrim,
        topTrimRatio: round3(topTrim / unitsPerEm),
        bottomTrimRatio: round3(bottomTrim / unitsPerEm),
      };
    }

    default:
      return state;
  }
};
