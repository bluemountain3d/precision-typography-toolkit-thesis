import classNames from 'clsx';
import styles from './Header.module.scss';
import { Container } from '@/components/layout/Container';
import { Flex } from '@/components/layout/Flex';
import { Brand } from './Brand';
import { MenuButton } from './MenuButton';
import { Navigation } from './Navigation';

/**
 * Props for Header component
 *
 * @property {boolean} [isScrolled] - Whether user has scrolled past sentinel
 * @property {boolean} isMenuOpen - Whether mobile menu is open
 * @property {function} onMenuToggle - Callback to toggle menu state
 */
export interface HeaderProps {
  isScrolled?: boolean;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

/**
 * Site header with logo, menu button, and navigation
 *
 * Renders as Fragment containing:
 * - Header bar (logo + menu button)
 * - Navigation (positioned separately for responsive behavior)
 *
 * CSS classes applied dynamically based on scroll and menu state
 *
 * @param {HeaderProps} props - Component props
 * @returns {JSX.Element} Header and navigation elements
 */
export const Header = ({
  isScrolled,
  isMenuOpen,
  onMenuToggle,
}: HeaderProps) => {
  return (
    <>
      <header
        className={classNames(
          styles.header,
          isScrolled ? styles['header--scrolled'] : styles['header--default'],
          isMenuOpen && styles['header--menu-open']
        )}
      >
        <Container variant="boxed">
          <Flex justifyContent="space-between" alignItems="center">
            <Brand />
            <MenuButton isOpen={isMenuOpen} onClick={onMenuToggle} />
          </Flex>
        </Container>
      </header>

      {/* Navigation rendered outside header for flexible positioning */}
      <Navigation
        isOpen={isMenuOpen}
        onClose={() => onMenuToggle()}
        isScrolled={isScrolled}
      />
    </>
  );
};
