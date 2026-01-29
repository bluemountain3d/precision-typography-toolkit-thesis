import type { Font } from 'fontkit';
import {
  LOWERCASE_TEST_CHARS,
  UPPERCASE_SIDE_BEARING_CHARS,
  LOWERCASE_SIDE_BEARING_CHARS,
} from './fontParser.constants';

/**
 * Gets the maximum height from a list of character bounding boxes
 * @param font - The fontkit Font object
 * @param chars - Array of characters to measure
 * @returns Minimum height from all measured characters, or 0 if none found
 */
export const getBBoxHeight = (font: Font, chars: string[]): number => {
  const heights = chars
    .map((char) => {
      const glyph = font.glyphForCodePoint(char.codePointAt(0)!);
      return glyph?.bbox?.maxY || 0;
    })
    .filter((h) => h > 0);

  return heights.length > 0 ? Math.min(...heights) : 0;
};

/**
 * Checks if a font only contains uppercase glyphs
 * @param font - The fontkit Font object
 * @returns true if font is all-caps (no lowercase glyphs or lowercase = uppercase)
 */
export const isAllCapsFont = (font: Font): boolean => {
  // Check for missing lowercase glyphs
  const hasLowercase = LOWERCASE_TEST_CHARS.some((char) =>
    font.hasGlyphForCodePoint(char.charCodeAt(0))
  );

  if (!hasLowercase) return true;

  // Check if lowercase = uppercase (same glyph)
  const lowerA = font.glyphForCodePoint('a'.charCodeAt(0));
  const upperA = font.glyphForCodePoint('A'.charCodeAt(0));

  return lowerA?.id === upperA?.id;
};

/**
 * Calculates average of an array of numbers
 * @param values - Array of numbers to average
 * @returns Average value, or 0 if array is empty
 */
export const average = (values: number[]): number => {
  return values.length > 0
    ? values.reduce((a, b) => a + b, 0) / values.length
    : 0;
};

/**
 * Calculates average side bearings for given characters
 * @param font - The fontkit Font object
 * @returns Object with average left and right side bearings in font units
 */
export const getAverageSideBearings = (
  font: Font
): { lsb: number; rsb: number } => {
  const lsbValues: number[] = [];
  const rsbValues: number[] = [];

  const charList: string[] = isAllCapsFont(font)
    ? UPPERCASE_SIDE_BEARING_CHARS
    : LOWERCASE_SIDE_BEARING_CHARS;

  for (const char of charList) {
    try {
      const glyph = font.glyphForCodePoint(char.charCodeAt(0));
      if (!glyph || glyph.id === 0) continue;

      // LSB (left side bearing)
      lsbValues.push(glyph.bbox.minX);

      // RSB (right side bearing): advanceWidth minus where the letter path ends
      const rsb = glyph.advanceWidth - glyph.bbox.maxX;
      rsbValues.push(rsb);
    } catch {
      continue;
    }
  }

  return {
    lsb: Math.round(average(lsbValues)),
    rsb: Math.round(average(rsbValues)),
  };
};

/**
 * Extracts side bearings for all characters in a list
 * @param font - The fontkit Font object
 * @param charList - Array of characters to extract side bearings for
 * @returns Record mapping each character to its side bearing values
 */
export const extractAllSideBearings = (
  font: Font,
  charList: string[]
): Record<string, { aw: number; lsb: number; rsb: number }> => {
  const sideBearings: Record<string, { aw: number; lsb: number; rsb: number }> =
    {};

  for (const char of charList) {
    const codePoint = char.codePointAt(0);
    if (codePoint === undefined) continue;

    const glyph = font.glyphForCodePoint(codePoint);

    if (glyph) {
      // In fontkit, LSB is the distance from 0 to the left edge of the bbox
      const aw = Math.round(glyph.advanceWidth * 100) / 100;
      const lsb = Math.round(glyph.bbox.minX * 100) / 100;
      const rsb = Math.round((aw - glyph.bbox.maxX) * 100) / 100;

      sideBearings[char] = {
        aw: aw,
        lsb: lsb,
        rsb: rsb,
      };
    }
  }

  return sideBearings;
};

/**
 * Creates a URL-safe slug from font family name
 * Removes "vf" or "variable" suffix, converts to lowercase, and replaces special characters
 * @param familyName - Original font family name
 * @returns URL-safe slug
 * @example
 * createFontSlug('Roboto VF') // 'roboto'
 * createFontSlug('Open Sans') // 'open-sans'
 */
export const createFontSlug = (familyName?: string): string => {
  if (!familyName) return '';

  return familyName
    .toLowerCase()
    .replace(/[-._]?(vf|variable)$/i, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/\s+/g, '-');
};

/**
 * Calculates trim values for text-box-trim CSS polyfill
 * @param capHeight - Cap height in font units
 * @param upmAscender - Corrected ascender value
 * @param upmDescender - Corrected descender value (positive)
 * @param unitsPerEm - Font's units per em
 * @returns Object with top and bottom trim values
 */
export const calculateTrimValues = (
  capHeight: number,
  upmAscender: number,
  upmDescender: number,
  unitsPerEm: number
): { topTrim: number; bottomTrim: number } => {
  const topTrim = Math.round(
    Math.abs((capHeight - upmAscender) / unitsPerEm) * unitsPerEm
  );

  const bottomTrim = Math.round(
    Math.abs(upmDescender / unitsPerEm) * unitsPerEm
  );

  return { topTrim, bottomTrim };
};

/**
 * Gets text variant widths for a font
 * Measures the width of predefined text variants to understand font metrics
 * @param font - The fontkit Font object
 * @param variants - Array of text strings to measure
 * @returns Record mapping each variant to its advance width
 */
export const getTextVariantWidths = (
  font: Font,
  variants: string[]
): Record<string, number> => {
  return variants.reduce(
    (acc, text) => {
      acc[text] = font.layout(text).advanceWidth;
      return acc;
    },
    {} as Record<string, number>
  );
};
