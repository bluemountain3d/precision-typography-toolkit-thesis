import { describe, it, expect } from 'vitest';
import { getCategory } from '@utils/getFontCategory';

// Mock the entire Font type to avoid TypeScript errors
const createMockFont = (overrides: any = {}): any => {
  const defaultFont = {
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
      version: 4,
      xHeight: 500,
      capHeight: 700,
      defaultChar: 0,
      breakChar: 32,
      maxContext: 0,
      usLowerOpticalPointSize: 0,
      usUpperOpticalPointSize: 0,
      achVendID: 'NONE',
      fsSelection: 0,
      fsType: 0,
      sTypoLineGap: 0,
      sxHeight: 0,
      sCapHeight: 0,
      ulUnicodeRange1: 0,
      ulUnicodeRange2: 0,
      ulUnicodeRange3: 0,
      ulUnicodeRange4: 0,
      ulCodePageRange1: 0,
      ulCodePageRange2: 0,
      yStrikeoutSize: 0,
      yStrikeoutPosition: 0,
      ySubscriptXSize: 0,
      ySubscriptYSize: 0,
      ySubscriptXOffset: 0,
      ySubscriptYOffset: 0,
      ySuperscriptXSize: 0,
      ySuperscriptYSize: 0,
      ySuperscriptXOffset: 0,
      ySuperscriptYOffset: 0,
    },
    post: {
      isFixedPitch: 0,
      italicAngle: 0,
      underlinePosition: 0,
      underlineThickness: 0,
      minMemType42: 0,
      maxMemType42: 0,
      minMemType1: 0,
      maxMemType1: 0,
      version: 2,
    },
    glyphForCodePoint: (codePoint: number) => ({
      advanceWidth: codePoint === 'i'.charCodeAt(0) ? 300 : 900,
      bbox: { minX: 0, maxX: 500, minY: 0, maxY: 700 },
      id: codePoint,
      codePoints: [codePoint],
      path: { commands: [] },
      cbox: { minX: 0, maxX: 500, minY: 0, maxY: 700 },
      isMark: false,
      isLigature: false,
      name: '',
    }),
  };

  const merged = { ...defaultFont, ...overrides };
  if (overrides['OS/2']) {
    merged['OS/2'] = { ...defaultFont['OS/2'], ...overrides['OS/2'] };
  }
  if (overrides.post) {
    merged.post = { ...defaultFont.post, ...overrides.post };
  }
  if (overrides.glyphForCodePoint) {
    merged.glyphForCodePoint = overrides.glyphForCodePoint;
  }

  return merged;
};

describe('getCategory', () => {
  describe('monospace detection', () => {
    it('should detect monospace via OS/2 PANOSE', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [2, 11, 5, 9, 0, 0, 0, 0, 0, 0],
        },
      });

      expect(getCategory(font)).toBe('monospace');
    });

    it('should detect monospace via equal glyph widths', () => {
      const font = createMockFont({
        glyphForCodePoint: (codePoint: number) => ({
          advanceWidth: 600,
          bbox: { minX: 0, maxX: 500, minY: 0, maxY: 700 },
          id: codePoint,
          codePoints: [codePoint],
          path: { commands: [] },
          cbox: { minX: 0, maxX: 500, minY: 0, maxY: 700 },
          isMark: false,
          isLigature: false,
          name: '',
        }),
      });

      expect(getCategory(font)).toBe('monospace');
    });
  });

  describe('cursive/script detection', () => {
    it('should detect cursive via PANOSE family kind', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      });

      expect(getCategory(font)).toBe('cursive');
    });

    it('should detect cursive via sFamilyClass', () => {
      const font = createMockFont({
        'OS/2': {
          sFamilyClass: 10 << 8,
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
          panose: [2, 2, 5, 0, 0, 0, 0, 0, 0, 0],
        },
      });

      expect(getCategory(font)).toBe('serif');
    });

    it('should detect serif via sFamilyClass', () => {
      const font = createMockFont({
        'OS/2': {
          sFamilyClass: 1 << 8,
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
          panose: [2, 11, 5, 0, 0, 0, 0, 0, 0, 0],
        },
      });

      expect(getCategory(font)).toBe('sans-serif');
    });

    it('should detect sans-serif via sFamilyClass', () => {
      const font = createMockFont({
        'OS/2': {
          sFamilyClass: 8 << 8,
        },
      });

      expect(getCategory(font)).toBe('sans-serif');
    });

    it('should default to sans-serif when no clear category', () => {
      const font = createMockFont({
        familyName: 'Unknown Font',
      });

      expect(getCategory(font)).toBe('sans-serif');
    });
  });

  describe('fantasy/decorative detection', () => {
    it('should detect fantasy via PANOSE family kind', () => {
      const font = createMockFont({
        'OS/2': {
          panose: [4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      });

      expect(getCategory(font)).toBe('fantasy');
    });

    it('should detect fantasy via sFamilyClass', () => {
      const font = createMockFont({
        'OS/2': {
          sFamilyClass: 12 << 8,
        },
      });

      expect(getCategory(font)).toBe('fantasy');
    });
  });

  describe('priority order', () => {
    it('should prioritize monospace over other categories', () => {
      const font = createMockFont({
        familyName: 'Courier Serif',
        'OS/2': {
          panose: [2, 2, 5, 9, 0, 0, 0, 0, 0, 0],
          sFamilyClass: 1 << 8,
        },
      });

      expect(getCategory(font)).toBe('monospace');
    });

    it('should prioritize cursive over serif/sans', () => {
      const font = createMockFont({
        familyName: 'Script Sans',
        'OS/2': {
          panose: [3, 11, 5, 0, 0, 0, 0, 0, 0, 0],
          sFamilyClass: 8 << 8,
        },
      });

      expect(getCategory(font)).toBe('cursive');
    });
  });
});
