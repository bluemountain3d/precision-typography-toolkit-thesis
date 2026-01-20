import styles from './NavItem.module.scss';
import classNames from 'clsx';
import type { NavLink } from '../Navigation.types';
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { RightSmallIcon } from '@/assets/icons';
import { Link, useLocation } from 'react-router-dom';

/**
 * Props for NavItem component
 *
 * @property {NavLink} item - Navigation data (label, path, optional children)
 * @property {function} onClose - Callback to close entire menu after navigation
 * @property {boolean} isMobile - Whether viewport is mobile/tablet size
 * @property {boolean} [isOpen] - Whether accordion is open (mobile only, controlled from parent)
 * @property {function} [onToggle] - Callback to toggle accordion (mobile only)
 */
interface NavLinkProps {
  item: NavLink;
  onClose: () => void;
  isMobile: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

/**
 * Navigation item component with responsive behavior
 *
 * MOBILE (accordion):
 * - Parent: <button> that toggles sub-menu
 * - Children: Conditionally rendered
 * - Click to toggle
 * - State controlled from parent
 *
 * DESKTOP (dropdown):
 * - Parent: <Link> with hover behavior
 * - Children: Always rendered (CSS transitions)
 * - Hover and keyboard focus
 * - Local state per item
 *
 * @param {NavLinkProps} props - Component props
 * @returns {JSX.Element} Navigation item
 */
export const NavItem = ({
  item,
  isMobile,
  onClose,
  isOpen = false,
  onToggle,
}: NavLinkProps) => {
  /** Hover state for desktop dropdown (not used on mobile) */
  const [isHovered, setIsHovered] = useState(false);

  /** Whether this item has sub-items */
  const hasChildren = item.children && item.children.length > 0;

  /** Current route location for active state detection */
  const location = useLocation();

  /**
   * Check if a path matches current location
   * @param {string} path - Path to check
   * @returns {boolean} True if path is current page
   */
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  /** Is this parent link the active page? */
  const isParentActive = item.path && isActive(item.path);

  /**
   * Does this parent have an active child?
   * Used to highlight parent when on a sub-page
   */
  const hasActiveChild =
    hasChildren &&
    item.children?.some((child) => child.path && isActive(child.path));

  /**
   * Focus handler - opens dropdown when tabbing (desktop keyboard navigation)
   */
  const handleFocus = () => setIsHovered(true);

  /**
   * Blur handler - closes dropdown only if focus leaves entire container
   * Keeps dropdown open when tabbing between child items
   */
  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsHovered(false);
    }
  };

  // Simple link without children - just render a basic link
  if (!hasChildren) {
    return (
      <li className={classNames(styles['nav-item'])}>
        <Link
          to={item.path!}
          onClick={onClose}
          aria-current={isParentActive ? 'page' : undefined}
          className={classNames(
            styles['nav-link'],
            isParentActive && styles['nav-link--active']
          )}
        >
          <span className={classNames(styles['nav-link__label'])}>
            {item.label}
          </span>
        </Link>
      </li>
    );
  }

  // Parent with children - render accordion (mobile) or dropdown (desktop)
  return (
    <li className={classNames(styles['nav-item'])}>
      {isMobile ? (
        /* MOBILE: Accordion pattern */
        <>
          {/* Accordion toggle button */}
          <button
            aria-expanded={isOpen}
            aria-controls={`submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => {
              onToggle?.();
            }}
            className={classNames(
              styles['nav-link'],
              isParentActive && styles['nav-link--active'],
              hasActiveChild && styles['nav-link--has-active-child']
            )}
          >
            <span className={classNames(styles['nav-link__label'])}>
              {item.label}
            </span>
            {/* Arrow icon rotates when accordion opens */}
            <Icon
              icon={RightSmallIcon}
              size="0.66em"
              aria-hidden="true"
              className={classNames(
                styles['nav-link__icon'],
                isOpen && styles['nav-link__icon--open']
              )}
            />
          </button>

          {/* Accordion content - conditionally rendered */}
          {isOpen && item.children && (
            <ul
              id={`submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              className={classNames(styles['sub-menu'])}
            >
              {item.children.map((child) => (
                <li
                  key={child.path}
                  className={classNames(
                    styles['nav-item'],
                    styles['nav-item--sub-item']
                  )}
                >
                  <Link
                    to={child.path!}
                    onClick={onClose}
                    className={classNames(
                      styles['nav-link'],
                      styles['nav-link--sub-link'],
                      child.path &&
                        isActive(child.path) &&
                        styles['nav-link--active']
                    )}
                  >
                    <span className={classNames(styles['nav-link__label'])}>
                      {child.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        /* DESKTOP: Dropdown pattern */
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={classNames(styles['nav-item__inner'])}
        >
          {/* Parent link with dropdown */}
          <Link
            to={item.path!}
            onClick={(e) => {
              // Prevent navigation when dropdown is open
              if (isHovered && item.children && item.children.length > 0) {
                e.preventDefault();
              }
            }}
            onKeyDown={(e) => {
              // Enter/Space toggles dropdown for keyboard users
              if (e.key === 'Enter' || e.key === ' ') {
                if (item.children && item.children.length > 0) {
                  e.preventDefault();
                  setIsHovered(!isHovered);
                }
              }
            }}
            aria-expanded={isHovered}
            aria-haspopup="true"
            className={classNames(
              styles['nav-link'],
              isParentActive && styles['nav-link--active'],
              hasActiveChild && styles['nav-link--has-active-child']
            )}
          >
            <span className={classNames(styles['nav-link__label'])}>
              {item.label}
            </span>
            {/* Arrow icon rotates when dropdown opens */}
            <Icon
              icon={RightSmallIcon}
              size="1em"
              aria-hidden="true"
              className={classNames(
                styles['nav-link__icon'],
                isHovered && styles['nav-link__icon--open']
              )}
            />
          </Link>

          {/* Dropdown menu - always in DOM for smooth CSS transitions */}
          {item.children && (
            <ul
              role="menu"
              className={classNames(
                styles.dropdown,
                isHovered && styles['dropdown--open']
              )}
            >
              {item.children.map((child) => (
                <li
                  key={child.path}
                  role="none"
                  className={classNames(styles.dropdown__item)}
                >
                  <Link
                    role="menuitem"
                    to={child.path!}
                    onClick={onClose}
                    reloadDocument={child.reloadDocument}
                    className={classNames(
                      styles.dropdown__link,
                      child.path &&
                        isActive(child.path) &&
                        styles['dropdown__link--active']
                    )}
                  >
                    <span
                      className={classNames(styles['dropdown__link-label'])}
                    >
                      {child.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
};
