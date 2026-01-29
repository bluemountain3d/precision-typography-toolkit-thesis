import type { FontSize } from '@/types';
import type React from 'react';

/**
 * Props for the Collapsible component
 *
 * @example
 * ```tsx
 * <Collapsible
 *   headingLevel={3}
 *   headingSize="heading-4"
 *   title="Export Options"
 *   defaultOpen={false}
 *   onToggle={(open) => console.log('Toggled:', open)}
 * >
 *   <p>Collapsible content here</p>
 * </Collapsible>
 * ```
 */
export interface CollapsibleProps {
  children: React.ReactNode;

  /**
   * Semantic heading level for accessibility (h2-h6)
   * Determines the heading tag used, independent of visual size
   */
  headingLevel: 2 | 3 | 4 | 5 | 6;

  /**
   * Visual size of the heading (optional)
   * If not provided, defaults to match headingLevel
   * Allows semantic heading (h2) to have different visual size (heading-4)
   */
  headingSize?: FontSize;

  title: string;
  className?: string;
  defaultOpen?: boolean;

  /**
   * Callback fired when the collapsible is toggled
   * @param open - New open state (true = expanded, false = collapsed)
   */
  onToggle?: (open: boolean) => void;
}
