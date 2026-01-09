/**
 * Font metrics extracted from font file
 *
 * Contains both raw values from the font file and normalized values
 * for use in CSS/visualization. All metrics are based on the font's
 * internal coordinate system (Units Per Em).
 *
 * @example
 * ```typescript
 * const metrics: FontMetrics = {
 *   familyName: "Source Sans 3",
 *   subFamilyName: "Regular",
 *   unitsPerEm: 1000,
 *   category: "sans-serif",
 *   hheaAscent: 1024,
 *   hheaDescent: -400,
 *   lineGap: 0,
 *   visualAscent: 812,
 *   visualDescent: 188,
 *   capHeight: 660,
 *   xHeight: 486,
 *   avgCharWidth: 600,
 *   topTrim: 0.152,
 *   bottomTrim: 0.188,
 * };
 * ```
 */
export interface FontMetrics {
  /**
   * The name of the typeface family
   * @example "Inter", "Source Sans 3", "Roboto"
   */
  familyName: string;
  fontSlug: string;

  /**
   * The specific weight or style variant
   * @example "Regular", "Bold", "Medium Italic"
   */
  subFamilyName: string;

  /**
   * The specific weight class
   * @example 300, 500, 700
   */
  weightClass: number;

  /**
   * The grid resolution of the font file
   * Defines how many units make up the em square
   * @example 1000, 2048
   */

  unitsPerEm: number;

  /**
   * Generic font category for CSS fallback
   * @example "sans-serif", "serif", "monospace", "cursive", "fantasy"
   */
  category: string;

  /**
   * Raw ascender value from hhea table
   * Distance from baseline to the highest point any glyph reaches
   * This is the font's actual ascender line (where tallest glyphs reach)
   * Same value as OS/2.sTypoAscender in most fonts
   * @example 1024
   */
  hheaAscender: number;

  /**
   * Raw descender value from hhea table
   * Distance from baseline to the lowest point any glyph reaches (negative)
   * This is the font's actual descender line (where deepest glyphs reach)
   * Same value as OS/2.sTypoDescender in most fonts
   * @example -400
   */
  hheaDescender: number;

  /**
   * Extra spacing added between lines
   * Usually 0 in modern fonts
   * @example 0
   */
  lineGap: number;

  /**
   * Corrected ascender fitted within UPM box
   * Used for leading-trim calculations and visualization
   * When hheaAscent + |hheaDescent| > unitsPerEm, the line box is centered
   * within the em square (±unitsPerEm/2 from baseline)
   * @example 812 (when hheaAscent=1024, descent=-400, upm=1000)
   */
  upmAscender?: number;

  /**
   * Corrected descender fitted within UPM box (positive value)
   * Used for leading-trim calculations and visualization
   * When hheaAscent + |hheaDescent| > unitsPerEm, the line box is centered
   * within the em square (±unitsPerEm/2 from baseline)
   * @example -188 (when hheaAscent=1024, descent=-400, upm=1000)
   */
  upmDescender?: number;

  /**
   * Height of uppercase letters with flat tops
   * Measured from baseline to top of capital letters like "H"
   * @example 660
   */
  capHeight: number;

  /**
   * Height of lowercase letters
   * Measured from baseline to top of letters like "x"
   * @example 486
   */
  xHeight: number;

  /**
   * Average character width in em units
   * Useful for monospace fonts and calculations
   * @example 600
   */
  avgCharWidth: number;

  /**
   * Space above cap height to ascender line (raw UPM units)
   * Used for leading-trim calculations
   * @example 152 (for a font with 1000 UPM)
   */
  topTrimRaw?: number;

  /**
   * Space below baseline to descender line (raw UPM units)
   * Used for leading-trim calculations
   * @example 188 (for a font with 1000 UPM)
   */
  bottomTrimRaw?: number;

  lsbAdjustRaw: number;
  rsbAdjustRaw: number
}


/**
 * Normalized font metrics for CSS export
 *
 * All values are converted to em units (value / unitsPerEm)
 * Ready for use in CSS custom properties, SCSS maps, or JSON export
 */
export interface NormalizedFontMetrics {
  familyName: string;
  subFamilyName: string;
  category: string;

  capHeight: number;
  xHeight: number;
  avgCharWidth: number;
  ascender: number; // upmAscender
  descender: number; // upmDescender

  topTrim: number;
  bottomTrim: number;

  lsbAdjust: number;
  rsbAdjust: number;

  // TODO: Add in future versions
  // /**
  //  * Left side bearing adjustment for optical alignment
  //  * Calculated from average of multiple glyphs
  //  */
  // lsbAdjust?: number;
  //
  // /**
  //  * Right side bearing adjustment for optical alignment
  //  * Calculated from average of multiple glyphs
  //  */
  // rsbAdjust?: number;
}
