import * as fontkit from 'fontkit';
import type { Font } from 'fontkit';
import { Buffer } from 'buffer';
import { getCorrectedAscenderDescender } from '@utils/getCorrectedMetrics';
import type { FontMetrics } from '@models';
import { getCategory } from '@utils/getFontCategory';
import { print } from '@utils/dev';
import {
  getBBoxHeight,
  getAverageSideBearings,
  extractAllSideBearings,
  createFontSlug,
  calculateTrimValues,
  getTextVariantWidths,
} from './fontParser.helpers';
import {
  CAP_HEIGHT_TEST_CHARS,
  X_HEIGHT_TEST_CHARS,
  ALL_LETTERS,
  TEXT_VARIANTS,
} from './fontParser.constants';

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

        // Debug: Print all side bearings
        print(extractAllSideBearings(font, ALL_LETTERS));

        const fontSlug = createFontSlug(font.familyName);

        /**
         * Check font.capHeight and font.xHeight
         * If not capHeight ? use letter H BBox y-max
         * If not xHeight ? use letter x BBox y-max
         */
        const capHeight = font.capHeight
          ? font.capHeight
          : getBBoxHeight(font, CAP_HEIGHT_TEST_CHARS);

        const xHeight = font.xHeight
          ? font.xHeight
          : getBBoxHeight(font, X_HEIGHT_TEST_CHARS);

        const { upmAscender, upmDescender } = getCorrectedAscenderDescender(
          font.hhea.ascent,
          font.hhea.descent,
          font.unitsPerEm
        );

        /**
         * Trim values for `text-box-trim` polyfill
         */
        const { topTrim, bottomTrim } = calculateTrimValues(
          capHeight,
          upmAscender,
          upmDescender,
          font.unitsPerEm
        );

        /**
         * Side bearings
         */
        const { lsb, rsb } = getAverageSideBearings(font);

        /**
         * Array with available font features
         */
        const features = font.availableFeatures;

        const isVariable = font.variationAxes.wght ? true : false;
        const variableAxis = font.variationAxes || null;

        /**
         * Text variant widths
         */
        const textVariantWidths = getTextVariantWidths(font, TEXT_VARIANTS);

        /**
         * Metrics object with RAW metrics in font units
         */
        const metrics: FontMetrics = {
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
