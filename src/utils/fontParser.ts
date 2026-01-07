import * as fontkit from 'fontkit';
import type { Font } from 'fontkit';
import { Buffer } from 'buffer';
import { getCorrectedAscenderDescender } from '@utils/getCorrectedMetrics';
import type { FontMetrics } from '@models';
import { getCategory } from '@utils/getFontCategory';

// interface FontWithPost extends Font {
//   post?: {
//     isFixedPitch: number;
//   };
// }

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

        /**
         * Check font.capHeight and font.xHeight
         * If not capHeight ? use letter H BBox y-max
         * If not xHeight ? use letter x BBox y-max
         */
        const capHeight = font.capHeight
          ? font.capHeight
          : getBBoxHeight(font, ['H']);
        const xHeight = font.xHeight
          ? font.xHeight
          : getBBoxHeight(font, ['x', 'a', 'o', 'm', 'n']);

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

        const bottomTrim = Math.round(
          Math.abs(upmDescender / font.unitsPerEm) * font.unitsPerEm
        );

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
