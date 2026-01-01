import type {
  FontFamily,
  HeadingSize,
  SpacingSize,
  SpacingStep,
  TextColor,
  TextWeight,
} from '@/types';
import type React from 'react';

export interface HeadingProps {
  children: string | React.ReactNode;
  level: HeadingLevel;
  size: HeadingSize;
  weight?: TextWeight;
  align?: 'left' | 'center' | 'right';
  family?: FontFamily;
  variant?: TextColor;
  marginTop?: SpacingSize | SpacingStep;
  marginBottom?: SpacingSize | SpacingStep;
  className?: string;
  [key: string]: any;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
