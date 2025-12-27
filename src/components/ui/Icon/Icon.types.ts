import type { FontSize, Spacing } from '@/types';

/**
 * Icon component props
 */
export interface IconProps {
  /**
   * SVG icon component (imported with ?react suffix)
   * @example icon={CopyIcon}
   */
  icon: React.ElementType<React.SVGProps<SVGSVGElement>>;
  /**
   * Icon color variant - uses design system color tokens
   * @default 'inherit'
   */
  fill?: IconFill;
  /**
   * Icon size - accepts predefined design tokens or custom CSS values
   * - Design tokens: 'textBase', 'textLg', 'spaceMd', etc.
   * - Custom values: '1.2em', '24px', '2rem'
   * @default 'textBase'
   */
  size?: FontSize | Spacing | number | string;
  className?: string;
}

/**
 * Icon fill color variants based on design system color tokens
 */
export type IconFill =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'disabled'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  /** Inherits color from parent element */
  | 'inherit';
