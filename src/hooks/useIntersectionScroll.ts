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

    // Create observer that triggers when sentinel enters/leaves viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is NOT intersecting viewport, user has scrolled down
        setIsScrolled(!entry.isIntersecting);
      },
      { 
        threshold: 0, // Trigger as soon as any pixel enters/leaves
        rootMargin: '-1px 0px 0px 0px' // Slight offset to avoid false triggers
      }
    );

    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]); // Intentionally using ref.current to re-run when element becomes available

  return isScrolled;
};
