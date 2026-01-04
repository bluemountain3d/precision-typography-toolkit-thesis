import { useState, useEffect, type RefObject } from 'react';

/**
 * Hook that detects when user has scrolled past a sentinel element
 *
 * @param ref - Reference to the sentinel element (typically positioned at top of page)
 * @returns boolean indicating if user has scrolled past the sentinel
 */
export const useIntersectionScroll = (ref: RefObject<HTMLElement | null>) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const checkScrollState = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const rect = element.getBoundingClientRect();

      // Sentinel is scrolled past if it's above the viewport
      const shouldBeScrolled = rect.top < 0 && scrollY >= 1;

      setIsScrolled(shouldBeScrolled);
    };

    // Create observer that triggers when sentinel enters/leaves viewport
    const observer = new IntersectionObserver(
      () => {
        // When intersection changes, check scroll state
        checkScrollState();
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    // Also listen to scroll events for continuous updates
    const handleScroll = () => {
      checkScrollState();
    };

    observer.observe(element);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial state
    checkScrollState();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]); // Intentionally using ref.current to re-run when element becomes available

  return isScrolled;
};
