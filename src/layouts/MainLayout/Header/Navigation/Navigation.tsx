import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks';
import styles from './Navigation.module.scss';
import classNames from 'clsx';
import { queries } from '@/types';
import { NavItem } from './NavItem';
import { navLinks } from './Navigation.types';
import { RemoveScroll } from 'react-remove-scroll';
import { FocusTrap } from 'focus-trap-react';

/**
 * Props for Navigation component
 *
 * @property {boolean} [isOpen] - Whether navigation is visible
 * @property {function} onClose - Callback to close navigation
 * @property {boolean} [isScrolled] - Whether user has scrolled (affects positioning)
 * @property {boolean} [isMobile] - Whether we're on mobile/tablet (passed from parent to avoid duplicate calculation)
 */
interface NavigationProps {
  isOpen?: boolean;
  onClose: () => void;
  isScrolled?: boolean;
  isMobile?: boolean;
}

/**
 * Main navigation component with responsive behavior
 *
 * MOBILE (tablet and below):
 * - Slide-in overlay from right
 * - Backdrop behind menu
 * - Accordion behavior (one sub-menu open at a time)
 * - Focus trap and scroll prevention
 * - ESC key to close
 *
 * DESKTOP (tablet-lg and up):
 * - Fixed positioning below header
 * - Dropdown menus on hover
 * - Multiple dropdowns can be open
 * - No backdrop or focus trap
 *
 * @param {NavigationProps} props - Component props
 * @returns {JSX.Element} Navigation menu
 */
export const Navigation = ({
  isOpen,
  onClose,
  isScrolled,
  isMobile: isMobileProp,
}: NavigationProps) => {
  /** Detect if we're on mobile/tablet breakpoint (use prop if provided, otherwise calculate) */
  const isMobileCalculated = useMediaQuery(queries.isTabletAndDown);
  const isMobile = isMobileProp ?? isMobileCalculated;

  /**
   * Tracks which sub-menu is open on mobile (accordion pattern)
   * null = no sub-menu open
   * number = index of open sub-menu
   * Ensures only one sub-menu is open at a time
   */
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  /**
   * ESC key handler to close menu
   * Cleanup function removes listener to prevent memory leaks
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  return (
    <>
      {/* Semi-transparent backdrop - mobile only */}
      {isMobile && (
        <div
          className={classNames(
            styles.backdrop,
            isOpen && styles['backdrop--open']
          )}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Prevent body scroll when menu is open on mobile */}
      <RemoveScroll enabled={isOpen && isMobile} removeScrollBar={false}>
        {/* Trap keyboard focus inside menu when open, but allow clicks outside */}
        <FocusTrap
          active={isOpen} // && isMobile
          focusTrapOptions={{
            allowOutsideClick: true,
            returnFocusOnDeactivate: true,
          }}
        >
          <nav
            id="main-navigation"
            aria-label="Main navigation"
            inert={!isOpen ? true : undefined}
            className={classNames(
              styles.navigation,
              isOpen && styles['navigation--open'],
              isScrolled && styles['navigation--scrolled']
            )}
          >
            <ul className={classNames(styles['nav-menu'])}>
              {navLinks.map((link, index) => (
                <NavItem
                  key={link.path || link.label}
                  item={link}
                  isMobile={isMobile}
                  isOpen={openItemIndex === index}
                  onToggle={() => {
                    // Accordion toggle: close if already open, otherwise open this one
                    setOpenItemIndex(openItemIndex === index ? null : index);
                  }}
                  onClose={() => {
                    onClose();
                  }}
                />
              ))}
            </ul>
          </nav>
        </FocusTrap>
      </RemoveScroll>
    </>
  );
};
