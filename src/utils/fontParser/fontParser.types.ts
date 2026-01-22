/**
 * Side bearing information for a single glyph
 */
export interface SideBearingInfo {
  /** Advance width */
  aw: number;
  /** Left side bearing */
  lsb: number;
  /** Right side bearing */
  rsb: number;
}

/**
 * Collection of side bearings for multiple characters
 */
export type SideBearingsMap = Record<string, SideBearingInfo>;

/**
 * Trim values for text-box-trim CSS polyfill
 */
export interface TrimValues {
  topTrim: number;
  bottomTrim: number;
}

/**
 * Average side bearing values
 */
export interface AverageSideBearings {
  lsb: number;
  rsb: number;
}
