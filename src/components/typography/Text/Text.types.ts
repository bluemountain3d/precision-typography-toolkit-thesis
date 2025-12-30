import type {
  SpacingSize,
  SpacingStep,
  TextColor,
  TextSize,
  TextWeight,
} from '@/types';
import type React from 'react';

export interface TextProps {
  children: React.ReactNode;
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  align?: 'left' | 'center' | 'right';
  variant?: TextColor;
  marginTop?: SpacingSize | SpacingStep;
  marginBottom?: SpacingSize | SpacingStep;
  className?: string;
  [key: string]: any;
}

export type TextElement =
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'figcaption' // image captions
  | 'q' // Inline quote
  | 'cite'; // Citation/reference
