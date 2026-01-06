/**
 * Font metrics context types
 *
 * Manages state for font metrics extraction and normalization.
 * Raw metrics are stored in UPM units (with descender as negative).
 * Normalized metrics are ratios (0-1) calculated as metric / unitsPerEm.
 */

/**
 * Font metrics state shape
 *
 * Complete state for font metrics extraction, normalization, and visualization.
 * Stores both raw metrics (in UPM units) and normalized ratios (0-1 range).
 *
 * **Raw Metrics:** Absolute values in UPM units
 * - Descenders are stored as negative values
 * - Used for precise calculations and display
 *
 * **Normalized Metrics:** Ratios relative to unitsPerEm
 * - All values are positive (0-1 range)
 * - Used for proportional sizing and em calculations
 */
export type FontMetricsState = {
  /** Currently selected metric for visualization (null if none) */
  selectedMetric: string | null;
  
  // Font file info
  /** Uploaded font File object (not persisted to localStorage) */
  fontFile: File | null;
  /** Original font family name from parsed metrics (e.g. "Source Sans Pro") */
  fontFamily: string | null;
  /** Dynamically loaded CSS font-family name (e.g. "uploaded-font-1234567890") */
  loadedFontFamily: string | null;
  /** Font subfamily name (e.g. "Regular", "Bold Italic") */
  subFamily: string | null;
  /** Font category (e.g. "sans-serif", "serif", "monospace") */
  category: string | null;

  // Raw metrics (all values in UPM units, negative descender)
  /** Units per em - the coordinate system scale (typically 1000 or 2048) */
  unitsPerEm: number | null;
  /** HHEA ascender - text selection top boundary */
  hheaAscender: number | null;
  /** HHEA descender - text selection bottom boundary (negative value) */
  hheaDescender: number | null;
  /** UPM ascender - font design ascender */
  upmAscender: number | null;
  /** UPM descender - font design descender (negative value) */
  upmDescender: number | null;
  /** Cap height - height of capital letters */
  capHeight: number | null;
  /** x-height - height of lowercase x */
  xHeight: number | null;
  /** Average character width */
  avgCharWidth: number | null;
  /** Line gap - spacing between lines */
  lineGap: number | null;
  /** Top trim RAW - static trim from font file (in UPM units) */
  topTrimRaw: number | null;
  /** Bottom trim RAW - static trim from font file (in UPM units) */
  bottomTrimRaw: number | null;
  /** Top trim - dynamic value adjusted for current line-height (in UPM units) */
  topTrim: number | null;
  /** Bottom trim - dynamic value adjusted for current line-height (in UPM units) */
  bottomTrim: number | null;

  // Normalized metrics (metric / unitsPerEm, all positive 0-1)
  /** Cap height as ratio of em (capHeight / unitsPerEm) */
  capHeightRatio: number | null;
  /** x-height as ratio of em (xHeight / unitsPerEm) */
  xHeightRatio: number | null;
  /** Average character width as ratio of em (avgCharWidth / unitsPerEm) */
  avgCharWidthRatio: number | null;
  /** HHEA ascender as ratio of em (hheaAscender / unitsPerEm) */
  hheaAscenderRatio: number | null;
  /** HHEA descender as ratio of em (hheaDescender / unitsPerEm) */
  hheaDescenderRatio: number | null;
  /** UPM ascender as ratio of em (upmAscender / unitsPerEm) */
  ascenderRatio: number | null;
  /** UPM descender as ratio of em (Math.abs(upmDescender) / unitsPerEm) */
  descenderRatio: number | null;
  /** Top trim RAW as ratio of em (topTrimRaw / unitsPerEm) */
  topTrimRawRatio: number | null;
  /** Bottom trim RAW as ratio of em (bottomTrimRaw / unitsPerEm) */
  bottomTrimRawRatio: number | null;
  /** Top trim as ratio of em (topTrim / unitsPerEm) - adjusted for line-height */
  topTrimRatio: number | null;
  /** Bottom trim as ratio of em (bottomTrim / unitsPerEm) - adjusted for line-height */
  bottomTrimRatio: number | null;

  // UI state
  /** Whether font is currently being loaded/parsed */
  isLoading: boolean;
  /** Error message if font upload/parsing failed */
  error: string | null;
};

/**
 * Initial state
 */
export const initialFontMetricsState: FontMetricsState = {
  selectedMetric: null,
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
  topTrimRaw: null,
  bottomTrimRaw: null,
  topTrim: null,
  bottomTrim: null,
  capHeightRatio: null,
  xHeightRatio: null,
  avgCharWidthRatio: null,
  hheaAscenderRatio: null,
  hheaDescenderRatio: null,
  ascenderRatio: null,
  descenderRatio: null,
  topTrimRawRatio: null,
  bottomTrimRawRatio: null,
  topTrimRatio: null,
  bottomTrimRatio: null,
  isLoading: false,
  error: null,
};

/**
 * Font metrics action types
 *
 * Actions for managing font metrics state:
 * - **FONT_UPLOAD_START**: Initiates font loading (sets isLoading: true)
 * - **FONT_UPLOAD_SUCCESS**: Stores parsed metrics (saves to localStorage)
 * - **FONT_UPLOAD_ERROR**: Handles parsing/loading errors (resets to initial state)
 * - **RESET_FONT**: Clears all font data (returns to initial state)
 * - **SET_SELECTED_METRIC**: Updates currently selected metric for visualization
 * - **UPDATE_LINE_HEIGHT_TRIMS**: Recalculates topTrim/bottomTrim based on line-height
 * - **RESTORE_FROM_STORAGE**: Restores metrics from localStorage (without File object)
 */
export type FontMetricsAction =
  | { type: 'FONT_UPLOAD_START' }
  | { type: 'FONT_UPLOAD_SUCCESS'; payload: FontMetricsState }
  | { type: 'FONT_UPLOAD_ERROR'; payload: string }
  | { type: 'RESET_FONT' }
  | { type: 'SET_SELECTED_METRIC'; payload: string | null }
  | { type: 'UPDATE_LINE_HEIGHT_TRIMS'; payload: number }
  | {
      type: 'RESTORE_FROM_STORAGE';
      payload: Omit<FontMetricsState, 'fontFile'>;
    };
