import type { ComponentProps } from 'react';
import type { MeasureLetter } from './MeasureLetter';
import type { Glyph } from './Glyph';
import type { MeasureLine } from './MeasureLine';

type MeasureLetterData = ComponentProps<typeof MeasureLetter>;
type GlyphData = ComponentProps<typeof Glyph>;
type MeasureLineData = ComponentProps<typeof MeasureLine>;

// Measure letters - left side (column 1)
export const measureLettersLeft: MeasureLetterData[] = [
  { letter: 'O', x: 109.77, y: 1119.25 },
  { letter: 'C', x: 114.74, y: 1994.25 },
  { letter: 'A', x: 112.75, y: 2622.73 },
  { letter: 'C', x: 114.74, y: 3244.25 },
  { letter: 'B', x: 133.63, y: 4122.73 },
  { letter: 'C', x: 114.74, y: 4994.25 },
  { letter: 'A', x: 112.75, y: 5622.73 },
  { letter: 'C', x: 114.74, y: 6244.25 },
  { letter: 'O', x: 109.77, y: 7119.25 },
];

// Measure letters - right side column 1
export const measureLettersRight1: MeasureLetterData[] = [
  { letter: 'J', x: 3704.54, y: 2219.49 },
  { letter: 'I', x: 3761.46, y: 2630.73 },
  { letter: 'K', x: 3682.66, y: 3032.23 },
  { letter: 'A', x: 3667.5, y: 4122.73 },
  { letter: 'J', x: 3704.54, y: 5219.49 },
  { letter: 'I', x: 3761.46, y: 5625.73 },
  { letter: 'K', x: 3682.66, y: 6032.23 },
];

// Measure letters - left side column 2
export const measureLettersLeft2: MeasureLetterData[] = [
  { letter: 'L', x: 5507.31, y: 2096.23 },
  { letter: 'I', x: 5559.59, y: 2619.97 },
  { letter: 'M', x: 5449.81, y: 3157.23 },
  { letter: 'B', x: 5486.5, y: 4122.73 },
  { letter: 'L', x: 5507.31, y: 5096.23 },
  { letter: 'I', x: 5559.59, y: 5630.73 },
  { letter: 'M', x: 5449.81, y: 6156.96 },
];

// Measure letters - right side column 2
export const measureLettersRight2: MeasureLetterData[] = [
  { letter: 'O', x: 9056.31, y: 1566.25 },
  { letter: 'I', x: 9153.26, y: 2630.73 },
  { letter: 'N', x: 9067.49, y: 3691.73 },
  { letter: 'N', x: 9067.49, y: 5191.73 },
  { letter: 'O', x: 9056.31, y: 6688.25 },
];

// Glyphs - first set (Lorem ipsum)
export const glyphsSet1: GlyphData[] = [
  { glyph: 'L', x: 765, y: 2444 },
  { glyph: 'o', x: 1301.2, y: 2670 },
  { glyph: 'r', x: 1753.52, y: 2674 },
  { glyph: 'e', x: 2132.26, y: 2674 },
  { glyph: 'm', x: 2514.26, y: 2673 },
  { glyph: 'i', x: 763.2, y: 3973 },
  { glyph: 'p', x: 1003.64, y: 4170 },
  { glyph: 's', x: 1564.18, y: 4171 },
  { glyph: 'u', x: 1858.4, y: 4174 },
  { glyph: 'm', x: 2357.04, y: 4173 },
  { glyph: 'd', x: 768, y: 5344 },
  { glyph: 'o', x: 1279.72, y: 5670 },
  { glyph: 'l', x: 1739.98, y: 5344 },
  { glyph: 'o', x: 2016.05, y: 5670 },
  { glyph: 'r', x: 2468.36, y: 5674 },
];

// Glyphs - second set (Lorem ipsum with leading trim)
export const glyphsSet2: GlyphData[] = [
  { glyph: 'L', x: 6164.99, y: 2444 },
  { glyph: 'o', x: 6701.19, y: 2670 },
  { glyph: 'r', x: 7153.51, y: 2674 },
  { glyph: 'e', x: 7532.25, y: 2674 },
  { glyph: 'm', x: 7914.25, y: 2673 },
  { glyph: 'i', x: 6163.19, y: 3973 },
  { glyph: 'p', x: 6403.63, y: 4170 },
  { glyph: 's', x: 6964.17, y: 4171 },
  { glyph: 'u', x: 7258.39, y: 4174 },
  { glyph: 'm', x: 7757.02, y: 4173 },
  { glyph: 'd', x: 6167.99, y: 5344 },
  { glyph: 'o', x: 6679.71, y: 5670 },
  { glyph: 'l', x: 7139.97, y: 5344 },
  { glyph: 'o', x: 7416.04, y: 5670 },
  { glyph: 'r', x: 7868.35, y: 5674 },
];

// Measure lines - left tall
export const measureLinesLeftTall: MeasureLineData[] = [
  { line: 'divider', x: 531.5, y: 2000 },
  { line: 'divider', x: 531.5, y: 2250 },
  { line: 'divider', x: 531.5, y: 3250 },
  { line: 'divider', x: 531.5, y: 3500 },
  { line: 'divider', x: 531.5, y: 5000 },
  { line: 'divider', x: 531.5, y: 5250 },
  { line: 'divider', x: 531.5, y: 6250 },
  { line: 'divider', x: 531.5, y: 6500 },
  { line: 'hook', x: 431, y: 1250 },
  { line: 'hook', x: 431, y: 2125 },
  { line: 'hook', x: 431, y: 2750 },
  { line: 'hook', x: 431, y: 3375 },
  { line: 'hook', x: 431, y: 4250 },
  { line: 'hook', x: 431, y: 5125 },
  { line: 'hook', x: 431, y: 5750 },
  { line: 'hook', x: 431, y: 6375 },
  { line: 'hook', x: 431, y: 7250 },
  { line: 'measure-tall-left', x: 531.5, y: 500 },
];

// Measure lines - right em boxes
export const measureLinesRightEm: MeasureLineData[] = [
  { line: 'measure-em', x: 3267.5, y: 2250 },
  { line: 'measure-em', x: 3267.5, y: 3750 },
  { line: 'measure-em', x: 3267.5, y: 5250 },
  { line: 'divider', x: 3267.5, y: 2447 },
  { line: 'divider', x: 3267.5, y: 3069 },
  { line: 'divider', x: 3267.5, y: 5447 },
  { line: 'divider', x: 3267.5, y: 6069 },
  { line: 'hook', x: 3467.5, y: 2348.5 },
  { line: 'hook', x: 3467.5, y: 2758 },
  { line: 'hook', x: 3467.5, y: 3159.5 },
  { line: 'hook', x: 3467.5, y: 4250 },
  { line: 'hook', x: 3467.5, y: 5348.5 },
  { line: 'hook', x: 3467.5, y: 5758 },
  { line: 'hook', x: 3467.5, y: 6159.5 },
];

// Measure lines - left 2
export const measureLinesLeft2: MeasureLineData[] = [
  { line: 'measure-2-left', x: 5931.5, y: 2000 },
  { line: 'divider', x: 5931.5, y: 2447 },
  { line: 'divider', x: 5931.5, y: 3069 },
  { line: 'divider', x: 5931.5, y: 3500 },
  { line: 'divider', x: 5931.5, y: 5000 },
  { line: 'divider', x: 5931.5, y: 5477 },
  { line: 'divider', x: 5931.5, y: 6069 },
  { line: 'hook', x: 5831.5, y: 2223.5 },
  { line: 'hook', x: 5831.5, y: 2758 },
  { line: 'hook', x: 5831.5, y: 3284.5 },
  { line: 'hook', x: 5831.5, y: 4250 },
  { line: 'hook', x: 5831.5, y: 5223.5 },
  { line: 'hook', x: 5831.5, y: 5758 },
  { line: 'hook', x: 5831.5, y: 6284.5 },
];

// Measure lines - right tall 2
export const measureLinesRightTall2: MeasureLineData[] = [
  { line: 'measure-tall-right', x: 8667.5, y: 947 },
  { line: 'divider', x: 8667.5, y: 2447 },
  { line: 'divider', x: 8667.5, y: 3069 },
  { line: 'divider', x: 8667.5, y: 4569 },
  { line: 'divider', x: 8667.5, y: 6069 },
  { line: 'hook', x: 8867.5, y: 1697 },
  { line: 'hook', x: 8867.5, y: 2758 },
  { line: 'hook', x: 8867.5, y: 3819 },
  { line: 'hook', x: 8867.5, y: 5319 },
  { line: 'hook', x: 8867.5, y: 6819 },
];
