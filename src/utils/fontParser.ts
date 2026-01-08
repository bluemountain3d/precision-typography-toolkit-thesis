import * as fontkit from 'fontkit';
import type { Font } from 'fontkit';
import { Buffer } from 'buffer';
import { getCorrectedAscenderDescender } from '@utils/getCorrectedMetrics';
import type { FontMetrics } from '@models';
import { getCategory } from '@utils/getFontCategory';

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

    const getSideBearingsUPM = (
      font: Font,
      charList: string[] = ['a', 'e', 'h', 'i', 'l', 'm', 'n', 'o', 'r', 's']
    ) => {
      const lsbValues: number[] = [];
      const rsbValues: number[] = [];

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

        console.log('==============================================');

        console.log('Family:', font.familyName);
        console.log('Units per Em', font.unitsPerEm);
        console.log('font Ascent:', font.ascent);
        console.log('font Descent:', font.descent);
        console.log('sTypoAscender:', font['OS/2'].typoAscender);
        console.log('sTypoDescender:', font['OS/2'].typoDescender);
        console.log('winAscent:', font['OS/2'].winAscent);
        console.log('winDescent:', font['OS/2'].winDescent);
        console.log('hhea ascent:', font.hhea.ascent);
        console.log('hhea descent:', font.hhea.descent);

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
        console.log('Top Trim:', topTrim);

        const bottomTrim = Math.round(
          Math.abs(upmDescender / font.unitsPerEm) * font.unitsPerEm
        );
        console.log('Bottom Trim:', bottomTrim);

        /**
         * Side bearings
         */
        const sideBearings = getSideBearingsUPM(font);
        const { lsb, rsb } = sideBearings;
        console.log('LSB:', lsb);
        console.log('RSB:', rsb);

        /**
         * Array with available font features
         */
        // TODO !! use for kerning check ??
        // const features = font.availableFeatures;

        console.log('==============================================');
        /**
         * Metics object with RAW metrics in font units
         */
        const metrics = {
          familyName: font.familyName,
          subFamilyName: font.subfamilyName,
          category: getCategory(font),
          unitsPerEm: font.unitsPerEm,
          hheaAscender: font.hhea.ascent,
          upmAscender: upmAscender,
          hheaDescender: font.hhea.descent,
          upmDescender: -upmDescender,
          capHeight: capHeight,
          xHeight: xHeight,
          avgCharWidth: font['OS/2'].xAvgCharWidth,
          lineGap: font.lineGap,
          topTrimRaw: topTrim,
          bottomTrimRaw: bottomTrim,
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
