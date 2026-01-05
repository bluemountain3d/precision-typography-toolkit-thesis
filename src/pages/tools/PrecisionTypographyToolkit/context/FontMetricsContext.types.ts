/**
 * Font metrics context types
 *
 * Manages state for font metrics extraction and normalization.
 * Raw metrics are stored in UPM units (with descender as negative).
 * Normalized metrics are ratios (0-1) calculated as metric / unitsPerEm.
 */

/**
 * Font metrics state shape
 */
export type FontMetricsState = {
  // Font file info
  fontFile: File | null;
  fontFamily: string | null; // Original font family name from metrics
  loadedFontFamily: string | null; // Dynamically loaded CSS font-family name
  subFamily: string | null;
  category: string | null;

  // Raw metrics (all values in UPM units, negative descender)
  unitsPerEm: number | null;
  hheaAscender: number | null;
  hheaDescender: number | null; // negative value
  upmAscender: number | null;
  upmDescender: number | null; // negative value
  capHeight: number | null;
  xHeight: number | null;
  avgCharWidth: number | null;
  lineGap: number | null;
  topTrim: number | null; // in UPM units
  bottomTrim: number | null; // in UPM units

  // Normalized metrics (metric / unitsPerEm, all positive 0-1)
  capHeightRatio: number | null;
  xHeightRatio: number | null;
  avgCharWidthRatio: number | null;
  hheaAscenderRatio: number | null; // hheaAscender / unitsPerEm
  hheaDescenderRatio: number | null; // hheaDescender / unitsPerEm
  ascenderRatio: number | null; // upmAscender / unitsPerEm
  descenderRatio: number | null; // Math.abs(upmDescender) / unitsPerEm
  topTrimRatio: number | null; // topTrim / unitsPerEm
  bottomTrimRatio: number | null; // bottomTrim / unitsPerEm

  // UI state
  isLoading: boolean;
  error: string | null;
};

/**
 * Initial state
 */
export const initialFontMetricsState: FontMetricsState = {
  fontFile: null,
  fontFamily: null,
  loadedFontFamily: null,
  subFamily: null,
  category: null,
  unitsPerEm: null,
  hheaAscender: null,
  hheaDescender: null,
  upmAscender: null,
  upmDescender: null,
  capHeight: null,
  xHeight: null,
  avgCharWidth: null,
  lineGap: null,
  topTrim: null,
  bottomTrim: null,
  capHeightRatio: null,
  xHeightRatio: null,
  avgCharWidthRatio: null,
  hheaAscenderRatio: null,
  hheaDescenderRatio: null,
  ascenderRatio: null,
  descenderRatio: null,
  topTrimRatio: null,
  bottomTrimRatio: null,
  isLoading: false,
  error: null,
};

/**
 * Action types
 */
export type FontMetricsAction =
  | { type: 'FONT_UPLOAD_START' }
  | { type: 'FONT_UPLOAD_SUCCESS'; payload: FontMetricsState }
  | { type: 'FONT_UPLOAD_ERROR'; payload: string }
  | { type: 'RESET_FONT' }
  | {
      type: 'RESTORE_FROM_STORAGE';
      payload: Omit<FontMetricsState, 'fontFile'>;
    };
