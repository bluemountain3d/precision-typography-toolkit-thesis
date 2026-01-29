import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMediaQuery } from '@hooks/useMediaQuery';

describe('useMediaQuery', () => {
  // Mock window.matchMedia
  const createMatchMedia = (matches: boolean) => {
    return vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
    }));
  };

  beforeEach(() => {
    // Reset matchMedia mock before each test
    vi.clearAllMocks();
  });

  describe('basic functionality', () => {
    it('should return true when media query matches', () => {
      window.matchMedia = createMatchMedia(true);

      const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

      expect(result.current).toBe(true);
    });

    it('should return false when media query does not match', () => {
      window.matchMedia = createMatchMedia(false);

      const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

      expect(result.current).toBe(false);
    });

    it('should handle different query strings', () => {
      window.matchMedia = createMatchMedia(true);

      const queries = [
        '(max-width: 640px)',
        '(min-width: 1024px)',
        '(orientation: landscape)',
        '(prefers-color-scheme: dark)',
      ];

      queries.forEach((query) => {
        const { result } = renderHook(() => useMediaQuery(query));
        expect(result.current).toBe(true);
      });
    });
  });

  // Skipping SSR test - can't properly simulate SSR in jsdom
  describe.skip('SSR fallback', () => {
    it('should return false during SSR (when window is not available)', () => {
      // This is difficult to test properly in jsdom environment
    });
  });

  describe('reactive updates', () => {
    it('should update when media query match changes', async () => {
      let listeners: Array<(event: MediaQueryListEvent) => void> = [];
      let matchesState = false;

      const mockMatchMedia = vi.fn().mockImplementation((query: string) => {
        return {
          matches: matchesState,
          media: query,
          onchange: null,
          addEventListener: vi.fn((event, listener) => {
            if (event === 'change') {
              listeners.push(listener);
            }
          }),
          removeEventListener: vi.fn((event, listener) => {
            if (event === 'change') {
              listeners = listeners.filter((l) => l !== listener);
            }
          }),
          dispatchEvent: vi.fn(),
        };
      });

      window.matchMedia = mockMatchMedia;

      const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

      expect(result.current).toBe(false);

      // Simulate media query change
      matchesState = true;
      listeners.forEach((listener) => {
        listener({ matches: true } as MediaQueryListEvent);
      });

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    it('should cleanup listeners on unmount', () => {
      const removeEventListener = vi.fn();
      const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener,
        dispatchEvent: vi.fn(),
      }));

      window.matchMedia = mockMatchMedia;

      const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));

      unmount();

      expect(removeEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
    });
  });

  describe('edge cases', () => {
    it('should handle empty query string', () => {
      window.matchMedia = createMatchMedia(false);

      const { result } = renderHook(() => useMediaQuery(''));

      expect(result.current).toBe(false);
    });

    it('should handle invalid query string gracefully', () => {
      window.matchMedia = createMatchMedia(false);

      const { result } = renderHook(() => useMediaQuery('not a valid query'));

      // Should not throw, just return false
      expect(result.current).toBe(false);
    });

    it('should handle complex combined queries', () => {
      window.matchMedia = createMatchMedia(true);

      const { result } = renderHook(() =>
        useMediaQuery('(min-width: 768px) and (max-width: 1024px)')
      );

      expect(result.current).toBe(true);
    });
  });

  describe('common responsive breakpoints', () => {
    it('should handle mobile breakpoint', () => {
      window.matchMedia = createMatchMedia(true);

      const { result } = renderHook(() => useMediaQuery('(max-width: 767px)'));

      expect(result.current).toBe(true);
    });

    it('should handle tablet breakpoint', () => {
      window.matchMedia = createMatchMedia(true);

      const { result } = renderHook(() =>
        useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
      );

      expect(result.current).toBe(true);
    });

    it('should handle desktop breakpoint', () => {
      window.matchMedia = createMatchMedia(true);

      const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

      expect(result.current).toBe(true);
    });
  });
});
