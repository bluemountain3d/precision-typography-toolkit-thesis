import { describe, it, expect } from 'vitest';
import {
  getBBoxHeight,
  isAllCapsFont,
  average,
  createFontSlug,
  calculateTrimValues,
  getTextVariantWidths,
} from './fontParser.helpers';

// Simple mock font for testing
const createMockFont = (overrides: any = {}): any => {
  return {
    glyphForCodePoint: (codePoint: number) => ({
      bbox: { maxY: 700, minX: 50, maxX: 550 },
      advanceWidth: 600,
      id: codePoint,
    }),
    hasGlyphForCodePoint: () => true,
    layout: (text: string) => ({ advanceWidth: text.length * 600 }),
    ...overrides,
  };
};

describe('fontParser.helpers', () => {
  describe('getBBoxHeight', () => {
    it('should return minimum height from character list', () => {
      const font = createMockFont({
        glyphForCodePoint: (code: number) => ({
          bbox: { maxY: code === 'H'.charCodeAt(0) ? 700 : 650 },
        }),
      });

      const result = getBBoxHeight(font, ['H', 'I', 'E']);
      expect(result).toBe(650);
    });

    it('should return 0 if no valid heights found', () => {
      const font = createMockFont({
        glyphForCodePoint: () => null,
      });

      const result = getBBoxHeight(font, ['H', 'I']);
      expect(result).toBe(0);
    });

    it('should filter out zero heights', () => {
      const font = createMockFont({
        glyphForCodePoint: (code: number) => ({
          bbox: { maxY: code === 'H'.charCodeAt(0) ? 700 : 0 },
        }),
      });

      const result = getBBoxHeight(font, ['H', 'I']);
      expect(result).toBe(700);
    });

    it('should handle empty character list', () => {
      const font = createMockFont();
      const result = getBBoxHeight(font, []);
      expect(result).toBe(0);
    });
  });

  describe('isAllCapsFont', () => {
    it('should return false for fonts with lowercase glyphs', () => {
      const font = createMockFont({
        hasGlyphForCodePoint: () => true,
        glyphForCodePoint: (code: number) => ({
          id: code, // Different IDs for different chars
        }),
      });

      expect(isAllCapsFont(font)).toBe(false);
    });

    it('should return true when no lowercase glyphs exist', () => {
      const font = createMockFont({
        hasGlyphForCodePoint: () => false,
      });

      expect(isAllCapsFont(font)).toBe(true);
    });

    it('should return true when lowercase = uppercase (same glyph)', () => {
      const font = createMockFont({
        hasGlyphForCodePoint: () => true,
        glyphForCodePoint: () => ({
          id: 1, // Same ID for all chars
        }),
      });

      expect(isAllCapsFont(font)).toBe(true);
    });
  });

  describe('average', () => {
    it('should calculate average of numbers', () => {
      expect(average([10, 20, 30])).toBe(20);
    });

    it('should return 0 for empty array', () => {
      expect(average([])).toBe(0);
    });

    it('should handle single value', () => {
      expect(average([42])).toBe(42);
    });

    it('should handle negative numbers', () => {
      expect(average([-10, 10])).toBe(0);
    });

    it('should handle decimals', () => {
      const result = average([1.5, 2.5, 3]);
      expect(result).toBeCloseTo(2.333333, 5); // Use toBeCloseTo for floating point
    });
  });

  describe('createFontSlug', () => {
    it('should convert to lowercase', () => {
      expect(createFontSlug('Roboto')).toBe('roboto');
    });

    it('should remove VF suffix', () => {
      expect(createFontSlug('Roboto VF')).toBe('roboto');
      expect(createFontSlug('Roboto-VF')).toBe('roboto');
      expect(createFontSlug('Roboto.vf')).toBe('roboto');
    });

    it('should remove Variable suffix', () => {
      expect(createFontSlug('Roboto Variable')).toBe('roboto');
      expect(createFontSlug('Roboto-variable')).toBe('roboto');
    });

    it('should replace spaces with hyphens', () => {
      expect(createFontSlug('Open Sans')).toBe('open-sans');
      expect(createFontSlug('Source Code Pro')).toBe('source-code-pro');
    });

    it('should replace special characters with hyphens', () => {
      expect(createFontSlug('Font_Name@2023')).toBe('font-name-2023');
    });

    it('should handle multiple consecutive special chars', () => {
      expect(createFontSlug('Font___Name')).toBe('font-name');
    });

    it('should return empty string for undefined', () => {
      expect(createFontSlug(undefined)).toBe('');
    });

    it('should return empty string for empty string', () => {
      expect(createFontSlug('')).toBe('');
    });

    it('should trim whitespace', () => {
      expect(createFontSlug('  Roboto  ')).toBe('roboto');
    });
  });

  describe('calculateTrimValues', () => {
    it('should calculate top and bottom trim values', () => {
      const result = calculateTrimValues(700, 800, 200, 1000);

      expect(result).toEqual({
        topTrim: 100,
        bottomTrim: 200,
      });
    });

    it('should round values', () => {
      const result = calculateTrimValues(705, 810, 195, 1000);

      expect(result.topTrim).toBe(105);
      expect(result.bottomTrim).toBe(195);
    });

    it('should handle zero values', () => {
      const result = calculateTrimValues(1000, 1000, 0, 1000);

      expect(result).toEqual({
        topTrim: 0,
        bottomTrim: 0,
      });
    });

    it('should handle different unitsPerEm', () => {
      const result = calculateTrimValues(1400, 1600, 400, 2000);

      expect(result).toEqual({
        topTrim: 200,
        bottomTrim: 400,
      });
    });
  });

  describe('getTextVariantWidths', () => {
    it('should return widths for each variant', () => {
      const font = createMockFont({
        layout: (text: string) => ({ advanceWidth: text.length * 100 }),
      });

      const result = getTextVariantWidths(font, ['H', 'Hx', 'Hxd']);

      expect(result).toEqual({
        H: 100,
        Hx: 200,
        Hxd: 300,
      });
    });

    it('should handle empty variants array', () => {
      const font = createMockFont();
      const result = getTextVariantWidths(font, []);

      expect(result).toEqual({});
    });

    it('should handle single variant', () => {
      const font = createMockFont({
        layout: () => ({ advanceWidth: 600 }),
      });

      const result = getTextVariantWidths(font, ['Hxdg0']);

      expect(result).toEqual({
        Hxdg0: 600,
      });
    });
  });
});
