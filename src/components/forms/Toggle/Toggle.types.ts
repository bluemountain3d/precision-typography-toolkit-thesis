import type React from 'react';

/**
 * Toggle component props
 */
export interface ToggleProps {
  /** Unique ID for the checkbox input (required for label association) */
  toggleId: string;
  /** Current checked state of the toggle */
  checked: boolean;
  /**
   * Callback fired when toggle state changes
   * @param checked - New checked state
   */
  onChange: (checked: boolean) => void;
  /** Disables the toggle and applies disabled styling */
  disabled?: boolean;
  /** Optional visible label text displayed next to toggle */
  label?: string | React.ReactNode;
  labelWidth?: number;
  labelPosition?: 'before' | 'after';
  /**
   * Size variant - controls both toggle dimensions and text size
   * @default 'base'
   */
  size?: ToggleSize;
}

/**
 * Available size variants for Toggle component
 */
export type ToggleSize = 'xs' | 'sm' | 'base' | 'md' | 'lg';
