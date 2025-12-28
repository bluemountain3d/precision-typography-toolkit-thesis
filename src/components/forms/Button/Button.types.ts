import type { IconFill } from '@/components/ui/Icon';
import type { SpacingSize } from '@/types';
import type React from 'react';

/**
 * Button component props
 */
export interface ButtonProps {
  /** Button text content */
  children: string;
  variant?: ButtonVariants;
  size?: ButtonSize;
  /**
   * SVG icon component to display before text
   * @example icon={SaveIcon}
   */
  icon?: React.ElementType<React.SVGProps<SVGSVGElement>>;
  /**
   * Icon color variant - defaults to 'inherit' to match button text color
   */
  iconFill?: IconFill;
  disabled?: boolean;
  /**
   * Shows loading state - disables interaction and can display loading indicator
   */
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * If provided, renders as an anchor tag instead of button
   */
  href?: string;
  /**
   * Opens href in new tab with security attributes (rel="noopener noreferrer")
   * Only applies when href is provided
   */
  external?: boolean;
  type?: ButtonType;
  /** Makes button expand to 100% width of container */
  fullWidth?: boolean;
  marginTop?: SpacingSize;
  marginBottom?: SpacingSize;
  className?: string;
}

export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'link'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type ButtonSize = 'xs' | 'sm' | 'base' | 'md' | 'lg';

export type ButtonType = 'button' | 'submit' | 'reset';
