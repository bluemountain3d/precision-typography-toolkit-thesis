import type { TextProps } from './Text.types';
import styles from './Text.module.scss';
import classNames from 'clsx';

/**
 * Soft Hyphen (U+00AD).
 *
 * An invisible character used to specify a valid line break point within a word.
 * It only becomes visible (as a hyphen) if the word actually wraps at that point.
 *
 * @example
 * import { Text, SHY } from '@/components/typography/Text';
 *
 * // Will only show a hyphen if the line breaks after "Typog"
 * <Text>
 * Typog{SHY}raphy
 * </Text>
 */
export const SHY = '\u00AD'; // Soft Hyphen

/**
 * Replaces HTML entities in a string (like `&shy;` or `&nbsp;`) with their corresponding Unicode characters.
 *
 * This is useful when rendering strings from a CMS or legacy data where entities are stored as text.
 *
 * @param rawText - The string containing HTML entities.
 * @returns The string with unicode characters.
 *
 * @example
 * // 1. Basic conversion
 * const safeString = cleanText('Typog&shy;raphy');
 * // Returns: "Typog\u00ADraphy" (Visual result: Typog-raphy)
 *
 * @example
 * // 2. Usage inside a component
 * const cmsData = "read&nbsp;more";
 *
 * <Text>
 * {cleanText(cmsData)}
 * </Text>
 */
export const cleanText = (rawText: string) => {
  if (!rawText) return '';

  return rawText
    .replace(/&shy;/g, '\u00AD') // Soft hyphen
    .replace(/&nbsp;/g, '\u00A0'); // Non-breaking space
};

/**
 * A polymorphic typography component for rendering text with consistent styling.
 *
 * Use this component for paragraphs, labels, spans, and other text elements
 * to ensure alignment with the design system's typography, spacing, and colors.
 *
 * @example
 * // Basic usage (renders a <p>)
 * <Text>This is a standard paragraph.</Text>
 *
 * @example
 * // Polymorphic usage with variants
 * <Text as="span" size="sm" weight="bold" variant="primary">
 * Small bold primary text inside a span.
 * </Text>
 *
 * @example
 * // Alignment and spacing
 * <Text align="center" marginBottom="4">
 * Centered text with bottom margin.
 * </Text>
 *
 * @example
 * // Automatic Hyphenation
 * <Text hyphens="auto">
 * Hyphen
 * -ated text .
 * </Text>
 *
 * @example
 * // Manual Hyphenation using the exported SHY constant
 * import { Text, SHY } from '@/components/typography/Text';
 * <Text hyphens="manual">
 * Typog{SHY}raphy is art.
 * </Text>
 */
export const Text = ({
  children,
  as: Component = 'p',
  size = 'base',
  weight,
  italic,
  align,
  variant,
  family,
  hyphens,
  marginTop,
  marginBottom,
  className,
  ...rest
}: TextProps) => {
  return (
    <Component
      className={classNames(
        styles.text,
        size && `text-${size}`,
        family && `font-family-${family}`,
        italic && `font-style-italic`,
        weight && `font-weight-${weight}`,
        align && `text-align-${align}`,
        hyphens && styles[`text--hyphens-${hyphens}`],
        variant && `color-text-${variant}`,
        marginTop && `mt-${marginTop}`,
        marginBottom && `mb-${marginBottom}`,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
