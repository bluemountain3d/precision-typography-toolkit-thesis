import styles from './Collapsible.module.scss';
import classNames from 'clsx';
import type { CollapsibleProps } from './Collapsible.types';
import { Icon } from '../Icon';
import { RightSmallIcon } from '@/assets/icons';
import type { FontSize } from '@/types';

/**
 * Collapsible disclosure component using native HTML details/summary
 *
 * Provides an accessible, keyboard-navigable collapsible section with:
 * - Semantic heading levels (h2-h6) independent of visual size
 * - Custom rotating marker icon
 * - Hover state with border color change
 * - Controlled/uncontrolled support
 *
 * @example
 * ```tsx
 * // Basic usage with default styling
 * <Collapsible
 *   headingLevel={3}
 *   title="Export Options"
 * >
 *   <p>Export as CSS, SCSS, or JSON</p>
 * </Collapsible>
 * ```
 *
 * @example
 * ```tsx
 * // With visual size override and controlled state
 * <Collapsible
 *   headingLevel={2}
 *   headingSize="heading-4"
 *   title="Advanced Settings"
 *   defaultOpen={true}
 *   onToggle={(open) => console.log('Toggled:', open)}
 * >
 *   <AdvancedOptions />
 * </Collapsible>
 * ```
 */
export const Collapsible = ({
  children,
  headingLevel,
  headingSize,
  title,
  className,
  defaultOpen = false,
  onToggle,
}: CollapsibleProps) => {
  const Title = `h${headingLevel}` as const;

  /** Default visual sizes mapped to heading levels */
  const defaultHeadingSizes: Record<number, FontSize> = {
    2: 'heading-2',
    3: 'heading-3',
    4: 'heading-4',
    5: 'heading-4', // Fallback to h4 visual size
    6: 'heading-4', // Fallback to h4 visual size
  };

  /**
   * Determines visual size - uses headingSize prop if provided,
   * otherwise defaults to match headingLevel
   */
  const titleSize = headingSize || defaultHeadingSizes[headingLevel];

  return (
    <details
      className={classNames(styles.collapsible, className)}
      open={defaultOpen}
      onToggle={(e) => onToggle?.(e.currentTarget.open)}
    >
      <summary>
        <Icon
          icon={RightSmallIcon}
          size={titleSize}
          className={classNames(styles['collapsible__marker'])}
        />
        <Title className={classNames(styles['collapsible__title'], titleSize)}>
          {title}
        </Title>
      </summary>
      <div className={classNames(styles['collapsible__content'])}>
        {children}
      </div>
    </details>
  );
};
