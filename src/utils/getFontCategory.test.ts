import { describe, it, expect, vi } from 'vitest';
import { getCategory } from '@utils/getFontCategory';
import type { Font } from 'fontkit';

// Helper to create mock font object
const createMockFont = (overrides: Partial<Font> = {}): Font => {
  return {
    familyName: 'Test Font',
    postscriptName: 'TestFont-Regular',
    'OS/2': {
      panose: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sFamilyClass: 0,
      usWeightClass: 400,
      xAvgCharWidth: 500,
      winAscent: 1000,
      winDescent: 250,
      typoAscender: 800,
      typoDescender: -200,
    },
    post: {
      isFixedPitch: 0,
    },
    glyphForCodePoint: vi.fn((codePoint: number) => ({
      advanceWidth: 600,
      bbox: { minX: 0, maxX: 500, minY: 0, maxY: 700 },
      id: codePoint === 'i'.charCodeAt(0) ? 1 : 2,
    })),
    ...overrides,
  } as unknown as Font;
};

describe('getCategory', () => {
  describe('monospace detection', () => {
    it('should detect monospace via OS/2 PANOSE', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [2, 11, 5, 9, 0, 0, 0, 0, 0, 0], // panose[3] = 9 means monospace
          sFamilyClass: 0,
          usWeightClass: 400,
          xAvgCharWidth: 600,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('monospace');
    });

    it('should detect monospace via equal glyph widths', () => {
      const font = createMockFont({
        glyphForCodePoint: vi.fn((codePoint: number) => ({
          advanceWidth: 600, // Same width for all glyphs
          bbox: { minX: 0, maxX: 500, minY: 0, maxY: 700 },
          id: codePoint,
        })),
      });

      expect(getCategory(font)).toBe('monospace');
    });
  });

  describe('cursive/script detection', () => {
    it('should detect cursive via PANOSE family kind', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0], // panose[0] = 3 means script
          sFamilyClass: 0,
          usWeightClass: 400,
          xAvgCharWidth: 500,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('cursive');
    });

    it('should detect cursive via sFamilyClass', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          sFamilyClass: 10 << 8, // Class 10 = Scripts
          usWeightClass: 400,
          xAvgCharWidth: 500,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('cursive');
    });

    it('should detect cursive via font name', () => {
      const font = createMockFont({
        familyName: 'Brush Script',
      });

      expect(getCategory(font)).toBe('cursive');
    });

    it('should detect handwriting fonts as cursive', () => {
      const font = createMockFont({
        familyName: 'My Handwriting Font',
      });

      expect(getCategory(font)).toBe('cursive');
    });
  });

  describe('serif detection', () => {
    it('should detect serif via PANOSE serif style', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [2, 2, 5, 0, 0, 0, 0, 0, 0, 0], // panose[1] = 2-10 means serif
          sFamilyClass: 0,
          usWeightClass: 400,
          xAvgCharWidth: 500,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('serif');
    });

    it('should detect serif via sFamilyClass', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          sFamilyClass: 1 << 8, // Class 1-7 = Serif
          usWeightClass: 400,
          xAvgCharWidth: 500,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('serif');
    });

    it('should detect serif via font name matching', () => {
      const fonts = [
        'Times New Roman',
        'Garamond Pro',
        'Georgia Regular',
        'Playfair Display',
      ];

      fonts.forEach((name) => {
        const font = createMockFont({ familyName: name });
        expect(getCategory(font)).toBe('serif');
      });
    });
  });

  describe('sans-serif detection', () => {
    it('should detect sans-serif via PANOSE', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [2, 11, 5, 0, 0, 0, 0, 0, 0, 0], // panose[1] = 11-13 means sans
          sFamilyClass: 0,
          usWeightClass: 400,
          xAvgCharWidth: 500,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('sans-serif');
    });

    it('should detect sans-serif via sFamilyClass', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          sFamilyClass: 8 << 8, // Class 8 = Sans-serif
          usWeightClass: 400,
          xAvgCharWidth: 500,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('sans-serif');
    });

    it('should default to sans-serif when no clear category', () => {
      const font = createMockFont({
        familyName: 'Unknown Font',
        'OS/2': {
          panose: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          sFamilyClass: 0,
          usWeightClass: 400,
          xAvgCharWidth: 500,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('sans-serif');
    });
  });

  describe('fantasy/decorative detection', () => {
    it('should detect fantasy via PANOSE family kind', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [4, 0, 0, 0, 0, 0, 0, 0, 0, 0], // panose[0] = 4 or 5 means fantasy
          sFamilyClass: 0,
          usWeightClass: 400,
          xAvgCharWidth: 500,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('fantasy');
    });

    it('should detect fantasy via sFamilyClass', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          sFamilyClass: 12 << 8, // Class 12 = Fantasy
          usWeightClass: 400,
          xAvgCharWidth: 500,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('fantasy');
    });
  });

  describe('priority order', () => {
    it('should prioritize monospace over other categories', () => {
      const font = createMockFont({
        familyName: 'Courier Serif', // Has "serif" in name
        'OS/2': {
          panose: [2, 2, 5, 9, 0, 0, 0, 0, 0, 0], // Serif style BUT monospace
          sFamilyClass: 1 << 8, // Serif class
          usWeightClass: 400,
          xAvgCharWidth: 600,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('monospace');
    });

    it('should prioritize cursive over serif/sans', () => {
      const font = createMockFont({
        familyName: 'Script Sans', // Has "sans" in name
        'OS/2': {
          panose: [3, 11, 5, 0, 0, 0, 0, 0, 0, 0], // Script family
          sFamilyClass: 8 << 8, // Sans class
          usWeightClass: 400,
          xAvgCharWidth: 500,
          winAscent: 1000,
          winDescent: 250,
          typoAscender: 800,
          typoDescender: -200,
        },
      });

      expect(getCategory(font)).toBe('cursive');
    });
  });
});
