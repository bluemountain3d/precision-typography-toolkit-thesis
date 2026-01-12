import type { IconComponent, IconFill } from '@/components/ui/Icon';
import type { SpacingSize } from '@/types';
import type React from 'react';

/**
 * Base properties shared by all button variants
 */
interface CustomButtonProps {
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariants;

  /**
   * Border radius of the button
   * @default 'md'
   */
  radius?: 'sm' | 'md' | 'lg';

  /**
   * Size variant affecting padding and font size
   * @default 'base'
   */
  size?: ButtonSize;

  narrow?: boolean;

  /**
   * Optional icon component to display alongside or instead of text
   */
  icon?: IconComponent;

  /**
   * Fill color for the icon
   * @default 'inherit'
   */
  iconFill?: IconFill;

  /**
   * Disables the button and prevents interaction
   * @default false
   */
  disabled?: boolean;

  /**
   * Shows loading state and disables interaction
   * @default false
   */
  loading?: boolean;

  /**
   * Click handler for button interactions
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * When provided, renders as an anchor tag instead of button
   */
  href?: string;

  /**
   * Opens link in new tab when href is provided
   * @default false
   */
  external?: boolean;

  /**
   * HTML button type attribute
   * @default 'button'
   */
  type?: ButtonType;

  /**
   * Makes button span full width of container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Adds top margin using spacing scale
   */
  marginTop?: SpacingSize;

  /**
   * Adds bottom margin using spacing scale
   */
  marginBottom?: SpacingSize;

  /**
   * Additional CSS classes to apply
   */
  className?: string;

  // /**
  //  * When false, button displays both icon and text
  //  * @default false
  //  */
  // iconOnly?: boolean;

  // /**
  //  * Button text content
  //  */
  // children?: React.ReactNode;
}

/**
 * Props for regular button with text content
 */
interface RegularButtonProps extends CustomButtonProps {
  /**
   * When false, button displays both icon and text
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Button text content
   */
  children: React.ReactNode;

  /**
   * Accessible label for screen readers (optional for regular buttons)
   */
  'aria-label'?: string;
}

/**
 * Props for icon-only button variant
 */
interface IconButtonProps extends CustomButtonProps {
  /**
   * When true, button only displays icon without text
   */
  iconOnly: boolean;

  /**
   * Icon-only buttons cannot have text children
   */
  children?: never;

  /**
   * Required accessible label for screen readers on icon-only buttons
   */
  'aria-label': string;

  /**
   * Required icon component for icon-only buttons
   */
  icon: IconComponent;
}

/**
 * Union type combining regular and icon-only button props
 * Omits 'size' from HTML attributes to avoid conflict with our custom size prop
 */
export type ButtonProps = (RegularButtonProps | IconButtonProps) &
  Omit<React.AllHTMLAttributes<HTMLElement>, 'size'>;

/**
 * Available button visual variants
 */
export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'link'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'label';

/**
 * Available button size variants
 */
export type ButtonSize = 'xs' | 'sm' | 'base' | 'md' | 'lg';

/**
 * HTML button type attribute values
 */
export type ButtonType = 'button' | 'submit' | 'reset';
