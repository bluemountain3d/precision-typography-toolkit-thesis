import { describe, it, expect, vi, beforeEach } from 'vitest';
import { parseFontFile } from './fontParser';
import type { Font } from 'fontkit';
import * as fontkit from 'fontkit';

// Mock dependencies
vi.mock('fontkit');
vi.mock('@utils/getCorrectedMetrics');
vi.mock('@utils/getFontCategory');
vi.mock('@utils/dev');
vi.mock('./fontParser.helpers');

// Import mocked modules
import { getCorrectedAscenderDescender } from '@utils/getCorrectedMetrics';
import { getCategory } from '@utils/getFontCategory';
import {
  getBBoxHeight,
  getAverageSideBearings,
  createFontSlug,
  calculateTrimValues,
  getTextVariantWidths,
} from './fontParser.helpers';

describe('parseFontFile', () => {
  // Helper to create a mock File object
  const createMockFile = (
    content: string = 'mock font data',
    name: string = 'test-font.ttf'
  ): File => {
    const blob = new Blob([content], { type: 'font/ttf' });
    return new File([blob], name, { type: 'font/ttf' });
  };

  // Helper to create a mock Font object
  const createMockFont = (overrides = {}): Partial<Font> => ({
    familyName: 'Test Font',
    subfamilyName: 'Regular',
    unitsPerEm: 1000,
    capHeight: 700,
    xHeight: 500,
    lineGap: 0,
    hhea: {
      ascent: 900,
      descent: -300,
    } as Font['hhea'],
    'OS/2': {
      usWeightClass: 400,
      xAvgCharWidth: 600,
    } as Font['OS/2'],
    availableFeatures: ['kern', 'liga'],
    variationAxes: {},
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementations
    vi.mocked(getCorrectedAscenderDescender).mockReturnValue({
      upmAscender: 800,
      upmDescender: 200,
    });

    vi.mocked(getCategory).mockReturnValue('sans-serif');
    vi.mocked(createFontSlug).mockReturnValue('test-font');
    vi.mocked(calculateTrimValues).mockReturnValue({
      topTrim: 100,
      bottomTrim: 100,
    });
    vi.mocked(getAverageSideBearings).mockReturnValue({
      lsb: 50,
      rsb: 50,
    });
    vi.mocked(getTextVariantWidths).mockReturnValue({
      'Hxdg0': 2450,
      Hxdg: 2100,
      Hxlj: 1850,
      Hxd: 1600,
      Hxl: 1350,
      Hx: 1100,
    });
  });

  describe('successful parsing', () => {
    it('should parse a valid font file and return FontMetrics', async () => {
      const mockFont = createMockFont();
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(result).toEqual({
        textVariantWidths: {
          'Hxdg0': 2450,
          Hxdg: 2100,
          Hxlj: 1850,
          Hxd: 1600,
          Hxl: 1350,
          Hx: 1100,
        },
        familyName: 'Test Font',
        fontSlug: 'test-font',
        subFamilyName: 'Regular',
        weightClass: 400,
        category: 'sans-serif',
        unitsPerEm: 1000,
        hheaAscender: 900,
        upmAscender: 800,
        hheaDescender: -300,
        upmDescender: -200,
        capHeight: 700,
        xHeight: 500,
        avgCharWidth: 600,
        lineGap: 0,
        topTrimRaw: 100,
        bottomTrimRaw: 100,
        lsbAdjustRaw: 50,
        rsbAdjustRaw: 50,
        features: ['kern', 'liga'],
        isVariable: false,
        variableAxis: {},
      });
    });

    it('should handle font without capHeight by using BBox calculation', async () => {
      const mockFont = createMockFont({ capHeight: undefined });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);
      vi.mocked(getBBoxHeight).mockReturnValue(680);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(getBBoxHeight).toHaveBeenCalledWith(
        mockFont,
        expect.arrayContaining(['H', 'I', 'E', 'T'])
      );
      expect(result.capHeight).toBe(680);
    });

    it('should handle font without xHeight by using BBox calculation', async () => {
      const mockFont = createMockFont({ xHeight: undefined });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);
      vi.mocked(getBBoxHeight).mockReturnValue(480);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(getBBoxHeight).toHaveBeenCalledWith(
        mockFont,
        expect.arrayContaining(['x', 'a', 'o', 'm', 'n', 'e'])
      );
      expect(result.xHeight).toBe(480);
    });

    it('should use existing capHeight and xHeight when available', async () => {
      const mockFont = createMockFont({
        capHeight: 700,
        xHeight: 500,
      });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(getBBoxHeight).not.toHaveBeenCalled();
      expect(result.capHeight).toBe(700);
      expect(result.xHeight).toBe(500);
    });

    it('should handle font collections (TTC) by selecting first font', async () => {
      const mockFont = createMockFont();
      const mockCollection = {
        fonts: [mockFont, createMockFont()],
      };
      vi.mocked(fontkit.create).mockReturnValue(
        mockCollection as unknown as Font
      );

      const file = createMockFile('', 'font-collection.ttc');
      const result = await parseFontFile(file);

      expect(result.familyName).toBe('Test Font');
    });

    it('should detect variable fonts with wght axis', async () => {
      const mockFont = createMockFont({
        variationAxes: {
          wght: {
            name: 'Weight',
            min: 100,
            default: 400,
            max: 900,
          },
        },
      });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(result.isVariable).toBe(true);
      expect(result.variableAxis).toEqual({
        wght: {
          name: 'Weight',
          min: 100,
          default: 400,
          max: 900,
        },
      });
    });

    it('should mark non-variable fonts correctly', async () => {
      const mockFont = createMockFont({
        variationAxes: {},
      });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(result.isVariable).toBe(false);
    });

    it('should extract font features', async () => {
      const mockFont = createMockFont({
        availableFeatures: ['kern', 'liga', 'calt', 'ss01', 'dlig'],
      });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(result.features).toEqual(['kern', 'liga', 'calt', 'ss01', 'dlig']);
    });

    it('should call getCorrectedAscenderDescender with correct values', async () => {
      const mockFont = createMockFont({
        hhea: { ascent: 900, descent: -300 } as Font['hhea'],
        unitsPerEm: 1000,
      });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      await parseFontFile(file);

      expect(getCorrectedAscenderDescender).toHaveBeenCalledWith(
        900,
        -300,
        1000
      );
    });

    it('should call calculateTrimValues with correct parameters', async () => {
      const mockFont = createMockFont({
        capHeight: 700,
        unitsPerEm: 1000,
      });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);
      vi.mocked(getCorrectedAscenderDescender).mockReturnValue({
        upmAscender: 800,
        upmDescender: 200,
      });

      const file = createMockFile();
      await parseFontFile(file);

      expect(calculateTrimValues).toHaveBeenCalledWith(700, 800, 200, 1000);
    });

    it('should negate upmDescender in result', async () => {
      const mockFont = createMockFont();
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);
      vi.mocked(getCorrectedAscenderDescender).mockReturnValue({
        upmAscender: 800,
        upmDescender: 200, // positive value from getCorrectedAscenderDescender
      });

      const file = createMockFile();
      const result = await parseFontFile(file);

      // Should be negated in the result
      expect(result.upmDescender).toBe(-200);
    });

    it('should create correct font slug from family name', async () => {
      const mockFont = createMockFont({ familyName: 'Source Sans 3' });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);
      vi.mocked(createFontSlug).mockReturnValue('source-sans-3');

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(createFontSlug).toHaveBeenCalledWith('Source Sans 3');
      expect(result.fontSlug).toBe('source-sans-3');
    });
  });

  describe('error handling', () => {
    it('should reject when FileReader encounters an error', async () => {
      const file = createMockFile();
      const readerError = new Error('Failed to read file');

      // Mock FileReader to trigger onerror
      const originalFileReader = global.FileReader;
      global.FileReader = vi.fn().mockImplementation(() => ({
        readAsArrayBuffer: vi.fn(function (this: FileReader) {
          setTimeout(() => {
            if (this.onerror) {
              this.onerror(new ProgressEvent('error'));
            }
          }, 0);
        }),
        error: readerError,
      })) as unknown as typeof FileReader;

      await expect(parseFontFile(file)).rejects.toThrow();

      global.FileReader = originalFileReader;
    });

    it('should reject when fontkit.create throws an error', async () => {
      vi.mocked(fontkit.create).mockImplementation(() => {
        throw new Error('Invalid font format');
      });

      const file = createMockFile();

      await expect(parseFontFile(file)).rejects.toThrow('Invalid font format');
    });

    it('should reject when font parsing fails', async () => {
      vi.mocked(fontkit.create).mockImplementation(() => {
        throw new Error('Corrupted font file');
      });

      const file = createMockFile();

      await expect(parseFontFile(file)).rejects.toThrow('Corrupted font file');
    });

    it('should reject when helper functions throw errors', async () => {
      const mockFont = createMockFont();
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);
      vi.mocked(calculateTrimValues).mockImplementation(() => {
        throw new Error('Failed to calculate trim values');
      });

      const file = createMockFile();

      await expect(parseFontFile(file)).rejects.toThrow(
        'Failed to calculate trim values'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle fonts with zero lineGap', async () => {
      const mockFont = createMockFont({ lineGap: 0 });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(result.lineGap).toBe(0);
    });

    it('should handle fonts with non-zero lineGap', async () => {
      const mockFont = createMockFont({ lineGap: 200 });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(result.lineGap).toBe(200);
    });

    it('should handle fonts with 2048 unitsPerEm (common in OpenType)', async () => {
      const mockFont = createMockFont({
        unitsPerEm: 2048,
        capHeight: 1434,
        xHeight: 1024,
        hhea: { ascent: 1843, descent: -615 } as Font['hhea'],
      });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(result.unitsPerEm).toBe(2048);
      expect(result.capHeight).toBe(1434);
      expect(result.xHeight).toBe(1024);
    });

    it('should handle fonts with empty availableFeatures', async () => {
      const mockFont = createMockFont({ availableFeatures: [] });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(result.features).toEqual([]);
    });

    it('should handle variable fonts without wght axis', async () => {
      const mockFont = createMockFont({
        variationAxes: {
          wdth: {
            name: 'Width',
            min: 75,
            default: 100,
            max: 125,
          },
        },
      });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      const result = await parseFontFile(file);

      // Should not be marked as variable since it doesn't have wght axis
      expect(result.isVariable).toBe(false);
      expect(result.variableAxis).toEqual({
        wdth: {
          name: 'Width',
          min: 75,
          default: 100,
          max: 125,
        },
      });
    });

    it('should handle fonts with multiple variable axes including wght', async () => {
      const mockFont = createMockFont({
        variationAxes: {
          wght: {
            name: 'Weight',
            min: 100,
            default: 400,
            max: 900,
          },
          wdth: {
            name: 'Width',
            min: 75,
            default: 100,
            max: 125,
          },
          slnt: {
            name: 'Slant',
            min: -15,
            default: 0,
            max: 0,
          },
        },
      });
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      const result = await parseFontFile(file);

      expect(result.isVariable).toBe(true);
      expect(result.variableAxis).toHaveProperty('wght');
      expect(result.variableAxis).toHaveProperty('wdth');
      expect(result.variableAxis).toHaveProperty('slnt');
    });
  });

  describe('integration with helper functions', () => {
    it('should call all required helper functions', async () => {
      const mockFont = createMockFont();
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      await parseFontFile(file);

      expect(createFontSlug).toHaveBeenCalled();
      expect(getCorrectedAscenderDescender).toHaveBeenCalled();
      expect(calculateTrimValues).toHaveBeenCalled();
      expect(getAverageSideBearings).toHaveBeenCalled();
      expect(getCategory).toHaveBeenCalled();
      expect(getTextVariantWidths).toHaveBeenCalled();
    });

    it('should call getAverageSideBearings with font', async () => {
      const mockFont = createMockFont();
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      await parseFontFile(file);

      expect(getAverageSideBearings).toHaveBeenCalledWith(mockFont);
    });

    it('should call getCategory with font', async () => {
      const mockFont = createMockFont();
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      await parseFontFile(file);

      expect(getCategory).toHaveBeenCalledWith(mockFont);
    });

    it('should call getTextVariantWidths with font and TEXT_VARIANTS', async () => {
      const mockFont = createMockFont();
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile();
      await parseFontFile(file);

      expect(getTextVariantWidths).toHaveBeenCalledWith(
        mockFont,
        expect.arrayContaining(['Hxdg0', 'Hxdg', 'Hxlj', 'Hxd', 'Hxl', 'Hx'])
      );
    });
  });

  describe('different font formats', () => {
    it('should handle .ttf files', async () => {
      const mockFont = createMockFont();
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile('ttf content', 'arial.ttf');
      const result = await parseFontFile(file);

      expect(result.familyName).toBe('Test Font');
    });

    it('should handle .otf files', async () => {
      const mockFont = createMockFont();
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile('otf content', 'myfont.otf');
      const result = await parseFontFile(file);

      expect(result.familyName).toBe('Test Font');
    });

    it('should handle .woff files', async () => {
      const mockFont = createMockFont();
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile('woff content', 'webfont.woff');
      const result = await parseFontFile(file);

      expect(result.familyName).toBe('Test Font');
    });

    it('should handle .woff2 files', async () => {
      const mockFont = createMockFont();
      vi.mocked(fontkit.create).mockReturnValue(mockFont as Font);

      const file = createMockFile('woff2 content', 'modern-font.woff2');
      const result = await parseFontFile(file);

      expect(result.familyName).toBe('Test Font');
    });
  });
});
