import type { SpacingSize, SpacingStep } from '@/types';
import React from 'react';

/**
 * ButtonGroup component props
 */
export interface ButtonGroupProps {
  children: React.ReactNode;
  /**
   * Horizontal alignment of buttons
   * - In row direction: controls justify-content
   * - In column direction: controls align-items
   * @default 'center'
   */
  align?:
    | 'left'
    | 'center'
    | 'right'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /**
   * Layout direction for button arrangement
   * @default 'row'
   */
  direction?: 'row' | 'column';
  /**
   * Spacing between buttons (uses gap utility classes)
   * @default 'lg'
   */
  gap?: SpacingSize | SpacingStep;
  /**
   * Makes ButtonGroup expand to 100% width of container
   */
  fullWidth?: boolean;
  marginTop?: SpacingSize | SpacingStep;
  marginBottom?: SpacingSize | SpacingStep;
}
