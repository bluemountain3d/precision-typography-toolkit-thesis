import styles from './ButtonGroup.module.scss';
import classNames from 'clsx';
import type { ButtonGroupProps } from './ButtonGroup.types';

/**
 * ButtonGroup component for arranging multiple buttons with consistent spacing and alignment.
 *
 * @example
 * // Horizontal group with buttons aligned right
 * <ButtonGroup align="right" gap="md">
 *   <Button variant="secondary">Cancel</Button>
 *   <Button variant="primary">Save</Button>
 * </ButtonGroup>
 *
 * @example
 * // Vertical stacked buttons (e.g., mobile)
 * <ButtonGroup direction="column" gap="sm" fullWidth>
 *   <Button fullWidth>Option 1</Button>
 *   <Button fullWidth>Option 2</Button>
 * </ButtonGroup>
 */
export const ButtonGroup = ({
  children,
  align = 'center',
  direction = 'row',
  gap = 'lg',
  fullWidth,
  marginTop,
  marginBottom,
  className,
  ...rest
}: ButtonGroupProps) => {
  return (
    <div
      className={classNames(
        styles['button-group'],
        styles[`button-group--${direction}`],
        styles[`button-group--${align}`],
        fullWidth && styles['button-group--full-width'],
        gap && `gap-${gap}`,
        marginTop && `mt-${marginTop}`,
        marginBottom && `mb-${marginBottom}`,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
