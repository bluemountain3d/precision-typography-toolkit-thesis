import * as fontkit from 'fontkit';
import type { Font } from 'fontkit';
import { Buffer } from 'buffer';
import { getCorrectedAscenderDescender } from '@utils/getCorrectedMetrics';
import type { FontMetrics } from '@models';
import { getCategory } from '@utils/getFontCategory';
import { print } from '@utils/dev';

export const parseFontFile = async (file: File): Promise<FontMetrics> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    const getBBoxHeight = (font: fontkit.Font, chars: string[]) => {
      const heights = chars
        .map((char) => {
          const glyph = font.glyphForCodePoint(char.codePointAt(0)!);
          return glyph?.bbox?.maxY || 0;
        })
        .filter((h) => h > 0);

      return heights.length > 0 ? Math.min(...heights) : 0;
    };

    // const getBBoxWidth = (font: fontkit.Font, text: string) => {
    //   const run = font.layout(text);
    //   return run.advanceWidth;
    // };

    const capitalLetters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

    const smallLetters = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];

    const allLetters = [...capitalLetters, ...smallLetters];

    const extractAllSideBearings = (font: any, charList: string[]) => {
      const sideBearings: Record<
        string,
        { aw: number; lsb: number; rsb: number }
      > = {};

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

    function isAllCapsFont(font: any): boolean {
      // Check for missing lowercase glyphs
      const testChars = ['a', 'e', 'i', 'o', 'n'];
      const hasLowercase = testChars.some((char) =>
        font.hasGlyphForCodePoint(char.charCodeAt(0))
      );

      if (!hasLowercase) return true;

      // Check if lowercase = uppercase (same glyph)
      const lowerA = font.glyphForCodePoint('a'.charCodeAt(0));
      const upperA = font.glyphForCodePoint('A'.charCodeAt(0));

      return lowerA?.id === upperA?.id;
    }

    const getSideBearingsUPM = (
      font: Font,
      // charList: string[] = ['a', 'e', 'h', 'i', 'l', 'm', 'n', 'o', 'r', 's']
    ) => {
      const lsbValues: number[] = [];
      const rsbValues: number[] = [];

      const charList: string[] = isAllCapsFont(font)
        ? ['B', 'D', 'E', 'H', 'I', 'L', 'N', 'O', 'R', 'S']
        : ['a', 'e', 'h', 'i', 'l', 'm', 'n', 'o', 'r', 's'];

      for (const char of charList) {
        try {
          const glyph = font.glyphForCodePoint(char.charCodeAt(0));
          if (!glyph || glyph.id === 0) continue;

          // LSB (left side)
          lsbValues.push(glyph.bbox.minX);

          // RSB (right side): advanceWidth minus where the letter path ends
          const rsb = glyph.advanceWidth - glyph.bbox.maxX;
          rsbValues.push(rsb);
        } catch (e) {
          continue;
        }
      }

      const avg = (values: number[]) =>
        values.length > 0
          ? values.reduce((a, b) => a + b, 0) / values.length
          : 0;

      return {
        lsb: Math.round(avg(lsbValues)),
        rsb: Math.round(avg(rsbValues)),
      };
    };

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const buffer = Buffer.from(arrayBuffer);
        const fontOrCollection = fontkit.create(buffer);

        let font: Font;

        if ('fonts' in fontOrCollection) {
          font = fontOrCollection.fonts[0];
        } else {
          font = fontOrCollection;
        }

        print(extractAllSideBearings(font, allLetters));

        const fontSlug = font.familyName
          ?.toLowerCase()
          .replace(/[-._]?(vf|variable)$/i, '')
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/\s+/g, '-');

        // print('==============================================');

        // print('Family:', font.familyName);
        // print('Units per Em', font.unitsPerEm);
        // print('font Ascent:', font.ascent);
        // print('font Descent:', font.descent);
        // print('sTypoAscender:', font['OS/2'].typoAscender);
        // print('sTypoDescender:', font['OS/2'].typoDescender);
        // print('winAscent:', font['OS/2'].winAscent);
        // print('winDescent:', font['OS/2'].winDescent);
        // print('hhea ascent:', font.hhea.ascent);
        // print('hhea descent:', font.hhea.descent);

        /**
         * Check font.capHeight and font.xHeight
         * If not capHeight ? use letter H BBox y-max
         * If not xHeight ? use letter x BBox y-max
         */
        const capHeight = font.capHeight
          ? font.capHeight
          : getBBoxHeight(font, ['H', 'I', 'E', 'T']);
        const xHeight = font.xHeight
          ? font.xHeight
          : getBBoxHeight(font, ['x', 'a', 'o', 'm', 'n', 'e']);

        const { upmAscender, upmDescender } = getCorrectedAscenderDescender(
          font.hhea.ascent,
          font.hhea.descent,
          font.unitsPerEm
        );

        /**
         * Trim values for `text-box-trim` polyfill
         */
        const topTrim = Math.round(
          Math.abs((capHeight - upmAscender) / font.unitsPerEm) *
            font.unitsPerEm
        );
        // print('Top Trim:', topTrim);

        const bottomTrim = Math.round(
          Math.abs(upmDescender / font.unitsPerEm) * font.unitsPerEm
        );
        // print('Bottom Trim:', bottomTrim);

        /**
         * Side bearings
         */
        const { lsb, rsb } = getSideBearingsUPM(font);

        /**
         * Array with available font features
         */
        const features = font.availableFeatures;

        const isVariable = font.variationAxes.wght ? true : false;
        const variableAxis = font.variationAxes || null;

        /**
         * Text variant widths
         */
        const textVariants = ['Hxdg0', 'Hxdg', 'Hxlj', 'Hxd', 'Hxl', 'Hx'];
        const textVariantWidths = textVariants.reduce(
          (acc, text) => {
            acc[text] = font.layout(text).advanceWidth;
            return acc;
          },
          {} as Record<string, number>
        );

        // print('==============================================');
        /**
         * Metics object with RAW metrics in font units
         */
        const metrics = {
          //
          textVariantWidths: textVariantWidths,
          // Identifier
          familyName: font.familyName,
          fontSlug: fontSlug,
          subFamilyName: font.subfamilyName,
          weightClass: font['OS/2'].usWeightClass,
          category: getCategory(font),
          // Metrics
          unitsPerEm: font.unitsPerEm,
          hheaAscender: font.hhea.ascent,
          upmAscender: upmAscender,
          hheaDescender: font.hhea.descent,
          upmDescender: -upmDescender,
          capHeight: capHeight,
          xHeight: xHeight,
          avgCharWidth: font['OS/2'].xAvgCharWidth,
          lineGap: font.lineGap,
          // Custom metrics
          topTrimRaw: topTrim,
          bottomTrimRaw: bottomTrim,
          lsbAdjustRaw: lsb,
          rsbAdjustRaw: rsb,
          // Features
          features: features,
          isVariable: isVariable,
          variableAxis: variableAxis,
        };

        resolve(metrics);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};
