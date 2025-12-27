import type { SpacingSize, SpacingStep } from '@/types';

/**
 * Container component props
 */
export interface ContainerProps {
  children: React.ReactNode;
  /**
   * Container width variant
   * - 'boxed': Standard max-width container with padding
   * - 'narrow': Narrower max-width for focused content
   * - 'full': Full viewport width
   * @default 'boxed'
   */
  variant: ContainerVariant;
  /**
   * Removes default internal padding/gap
   * @default false
   */
  noGap?: boolean;
  marginTop?: SpacingSize | SpacingStep;
  marginBottom?: SpacingSize | SpacingStep;
  /**
   * Sets a specific height on the container
   */
  height?: ContainerHeight;
  className?: string;
}

/**
 * Container width variants
 */
export type ContainerVariant = 'boxed' | 'narrow' | 'full';

/**
 * Predefined container height options
 */
export type ContainerHeight =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  /** Full viewport height (100vh) */
  | 'viewport';
