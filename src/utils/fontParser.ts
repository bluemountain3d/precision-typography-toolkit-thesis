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

        const { upmAscender, upmDescender } = getCorrectedAscenderDescender(
          font.hhea.ascent,
          font.hhea.descent,
          font.unitsPerEm
        );

        const topTrim = Math.round(
          Math.abs((font.capHeight - upmAscender) / font.unitsPerEm) *
            font.unitsPerEm
        );

        const bottomTrim = Math.round(
          Math.abs(upmDescender / font.unitsPerEm) * font.unitsPerEm
        );

        const metrics = {
          familyName: font.familyName,
          subFamilyName: font.subfamilyName,
          category: getCategory(font),
          unitsPerEm: font.unitsPerEm,
          hheaAscender: font.hhea.ascent,
          upmAscender: upmAscender,
          hheaDescender: font.hhea.descent,
          upmDescender: -upmDescender,
          capHeight: font.capHeight,
          xHeight: font.xHeight,
          avgCharWidth: font['OS/2'].xAvgCharWidth,
          lineGap: font.lineGap,
          topTrim: topTrim,
          bottomTrim: bottomTrim,
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
