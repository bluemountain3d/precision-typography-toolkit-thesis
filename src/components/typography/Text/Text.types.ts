import type {
  FontFamily,
  SpacingSize,
  SpacingStep,
  TextColor,
  TextSize,
  TextWeight,
} from '@/types';
import type React from 'react';

/**
 * Configuration props for the Text component.
 *
 * These props control the typography, spacing, alignment, and semantic HTML
 * structure of the text element.
 *
 * Common usage involves setting separate `size`, `weight`, and `variant` props
 * rather than a single style object.
 */
export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered within the text element.
   */
  children: React.ReactNode;

  /**
   * The semantic HTML element to render.
   * Useful for ensuring semantic validity (e.g., using 'label' for form labels or 'figcaption' for images).
   *
   * @default 'p'
   */
  as?: TextElement;

  /**
   * Sets the font size based on the design system's type scale.
   *
   * @default 'base'
   */
  size?: TextSize;

  /**
   * Sets the font weight.
   */
  weight?: TextWeight;

  /**
   * Controls the text alignment.
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Sets the text color using the design system's color tokens.
   */
  variant?: TextColor;

  /**
   * If true, applies italic style to the text.
   * @default false
   */
  italic?: boolean;

  /**
   * Controls CSS hyphenation behavior.
   * - `manual`: Let user insert hyphens where appropriate (css default behavior).
   * - `auto`: Let the browser insert hyphens where appropriate.
   * - `none`: Prevent words from being hyphenated.
   *
   * Useful for narrow containers or justified text.
   */
  hyphens?: 'auto' | 'none';

  /**
   * Sets the font family (e.g., serif, sans-serif, mono).
   */
  family?: FontFamily;

  /**
   * Adds margin to the top of the element using spacing tokens.
   */
  marginTop?: SpacingSize | SpacingStep;

  /**
   * Adds margin to the bottom of the element using spacing tokens.
   */
  marginBottom?: SpacingSize | SpacingStep;

  /**
   * Custom CSS class for specific overrides.
   */
  className?: string;
}

export type TextElement =
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'figcaption' // image captions
  | 'q' // Inline quote
  | 'cite'; // Citation/reference
