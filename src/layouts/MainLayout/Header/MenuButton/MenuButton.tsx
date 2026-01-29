import styles from './MenuButton.module.scss';
import classNames from 'clsx';
import { MenuIcon } from '@/assets/icons';
import { CloseIcon } from '@/assets/icons';
import { Text } from '@/components/typography/Text';
import { Icon } from '@/components/ui/Icon';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';

/**
 * Props for MenuButton component
 *
 * @property {boolean} isOpen - Whether menu is currently open
 * @property {function} onClick - Callback when button is clicked
 */
interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

/**
 * Accessible button for toggling mobile navigation menu
 *
 * Features:
 * - Switches icon between hamburger and close (☰ ↔ ✕)
 * - Shows text label on larger screens (phablet+)
 * - Full ARIA support for screen readers
 * - Controlled component (state managed by parent)
 *
 * @param {MenuButtonProps} props - Component props
 * @returns {JSX.Element} Menu toggle button
 */
export const MenuButton = ({ isOpen, onClick }: MenuButtonProps) => {
  /** Show text label on phablet and larger screens */
  const isBreakpoint = useMediaQuery(queries.isPhabletAndUp);

  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="main-navigation"
      onClick={onClick}
      className={classNames(styles['menu-button'])}
    >
      {/* Text label - only on larger screens */}
      {isBreakpoint && (
        <Text as="span" size="md">
          {isOpen ? 'Close' : 'Menu'}
        </Text>
      )}

      {/* Icon - always visible */}
      <span className={classNames(styles['menu-button__icon'])}>
        <Icon icon={isOpen ? CloseIcon : MenuIcon} />
      </span>
    </button>
  );
};
