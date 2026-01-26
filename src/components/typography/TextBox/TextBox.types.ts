import type { TextSize, SpacingSize, SpacingStep } from '@/types';

export interface TextBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;

  as?: React.ElementType;

  /**
   * Sets the base font-size context for the container.
   * * This is crucial for the layout calculation because:
   * 1. It scales the content inside.
   * 2. It acts as the reference for the `maxWidth` calculation (which uses `em`),
   * ensuring the line length stays optically correct regardless of text size.
   * * @default 'base'
   */
  widthSize?: TextSize;

  /**
   * The maximum line length (measure) for the text.
   * * The actual pixel width is calculated dynamically based on the active font family's
   * average character width to ensure a comfortable reading length (approx. 60-75 chars).
   * * @default '70ch'
   */
  maxWidth?: '60ch' | '65ch' | '70ch' | '75ch' | 'none';

  /**
   * Activates intelligent vertical rhythm (spacing between elements).
   * * Unlike simple gaps, this uses context-aware selectors (`:is`, `:has`) to apply spacing:
   * - **em**: Fluid spacing relative to text size. Tighter for lists, distinct gaps for headings.
   * - **space**: Strict spacing from the design system variables.
   */
  flow?: 'em' | 'space';

  /**
   * Centers the TextBox horizontally within its parent container.
   */
  centered?: boolean;

  /** Top margin from the spacing scale. */
  marginTop?: SpacingSize | SpacingStep;

  /** Bottom margin from the spacing scale. */
  marginBottom?: SpacingSize | SpacingStep;

  className?: string;
}
