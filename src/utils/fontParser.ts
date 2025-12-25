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

        const { actualAscender, actualDescender } =
          getCorrectedAscenderDescender(
            font.hhea.ascent,
            font.hhea.descent,
            font.unitsPerEm
          );

        const topTrim =
          Math.round(
            Math.abs((font.capHeight - actualAscender) / font.unitsPerEm) * 1000
          ) / 1000;

        const bottomTrim =
          Math.round(Math.abs(actualDescender / font.unitsPerEm) * 1000) / 1000;

        const metrics = {
          familyName: font.familyName,
          subFamilyName: font.subfamilyName,
          category: getCategory(font),
          unitsPerEm: font.unitsPerEm,
          hheaAscent: font.hhea.ascent,
          visualAscent: actualAscender,
          hheaDescent: font.hhea.descent,
          visualDescent: actualDescender,
          capHeight: font.capHeight,
          xHeight: font.xHeight,
          avgCharWidth: font['OS/2'].xAvgCharWidth,
          lineGap: font.lineGap,
          topTrim: topTrim,
          bottomTrim: bottomTrim,
        };

        console.log('Parsed metrics', metrics);
        resolve(metrics);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};
