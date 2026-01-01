import classNames from 'clsx';
import styles from './MainLayout.module.scss';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useIntersectionScroll } from '@/hooks';

/**
 * Main layout component that wraps all pages
 *
 * Manages:
 * - Navigation state (menu open/closed)
 * - Scroll detection (for header styling)
 * - Page composition (Header, Main, Footer)
 *
 * @returns {JSX.Element} The main layout structure
 */
export const MainLayout = () => {
  /** Controls mobile menu visibility */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** Reference to invisible sentinel element for scroll detection */
  const sentinelRef = useRef<HTMLDivElement>(null);

  /**
   * Tracks if user has scrolled past sentinel element
   * Uses Intersection Observer for performance
   */
  const isScrolled = useIntersectionScroll(sentinelRef);

  return (
    <div className={classNames(styles['page-wrapper'])}>
      {/* Skip link for keyboard navigation accessibility */}
      <a href="#main-content" className={styles['skip-link']}>
        Skip to main content
      </a>

      {/* 
        Invisible sentinel element at top of page
        Used by Intersection Observer to detect scroll
      */}
      <div
        ref={sentinelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1px',
          height: '1px',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      <Header
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />

      <Main>
        {/* React Router outlet for page content */}
        <Outlet />
      </Main>

      <Footer />
    </div>
  );
};
