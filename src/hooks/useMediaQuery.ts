import { useSyncExternalStore } from 'react';

/**
 * Hook for responsive breakpoint detection using media queries.
 * Uses useSyncExternalStore for optimal performance and React 18 compatibility.
 *
 * @param query - CSS media query string
 * @returns boolean indicating if the media query matches
 *
 * @example
 * // Using predefined breakpoint queries
 * import { queries } from '@/types';
 *
 * const isMobile = useMediaQuery(queries.isUpToTablet);
 * const isDesktop = useMediaQuery(queries.isDesktopAndUp);
 *
 * @example
 * // Using custom media query
 * const isSmallScreen = useMediaQuery('(max-width: 640px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 */
export const useMediaQuery = (query: string) => {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => false // SSR fallback
  );
};
