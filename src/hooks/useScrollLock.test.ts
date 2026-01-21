import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollLock } from '@hooks/useScrollLock';

describe('useScrollLock', () => {
  let originalBodyStyle: CSSStyleDeclaration;
  let originalInnerWidth: number;
  let originalClientWidth: number;

  beforeEach(() => {
    // Store original values
    originalBodyStyle = { ...document.body.style } as CSSStyleDeclaration;
    originalInnerWidth = window.innerWidth;
    originalClientWidth = document.body.clientWidth;

    // Reset body styles
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.documentElement.style.removeProperty('--scrollbar-width');
  });

  afterEach(() => {
    // Restore original values
    document.body.style.overflow = originalBodyStyle.overflow;
    document.body.style.paddingRight = originalBodyStyle.paddingRight;
    document.documentElement.style.removeProperty('--scrollbar-width');
    vi.restoreAllMocks();
  });

  describe('basic functionality', () => {
    it('should lock scroll when isLocked is true', () => {
      renderHook(() => useScrollLock(true));

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should not lock scroll when isLocked is false', () => {
      renderHook(() => useScrollLock(false));

      expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('should restore original overflow on unmount', () => {
      document.body.style.overflow = 'auto';
      const originalOverflow = document.body.style.overflow;

      const { unmount } = renderHook(() => useScrollLock(true));

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe(originalOverflow);
    });
  });

  describe('scrollbar width compensation', () => {
    it('should add padding to compensate for scrollbar width', () => {
      // Mock scrollbar width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(document.body, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1008, // 16px scrollbar
      });

      renderHook(() => useScrollLock(true));

      expect(document.body.style.paddingRight).toBe('16px');
    });

    it('should set CSS custom property for scrollbar width', () => {
      // Mock scrollbar width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(document.body, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1009, // 15px scrollbar
      });

      renderHook(() => useScrollLock(true));

      const scrollbarWidth = document.documentElement.style.getPropertyValue(
        '--scrollbar-width'
      );
      expect(scrollbarWidth).toBe('15px');
    });

    it('should not add padding when scrollbar width is 0', () => {
      // Mock no scrollbar
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(document.body, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1024, // No scrollbar
      });

      renderHook(() => useScrollLock(true));

      expect(document.body.style.paddingRight).toBe('');
    });
  });

  describe('cleanup behavior', () => {
    it('should restore original paddingRight on unmount', () => {
      document.body.style.paddingRight = '20px';
      const originalPadding = document.body.style.paddingRight;

      // Mock scrollbar
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(document.body, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1008,
      });

      const { unmount } = renderHook(() => useScrollLock(true));

      expect(document.body.style.paddingRight).toBe('16px');

      unmount();

      expect(document.body.style.paddingRight).toBe(originalPadding);
    });

    it('should remove CSS custom property on unmount', () => {
      // Mock scrollbar
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(document.body, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1008,
      });

      const { unmount } = renderHook(() => useScrollLock(true));

      expect(
        document.documentElement.style.getPropertyValue('--scrollbar-width')
      ).toBe('16px');

      unmount();

      expect(
        document.documentElement.style.getPropertyValue('--scrollbar-width')
      ).toBe('');
    });
  });

  describe('reactivity to isLocked changes', () => {
    it('should lock when isLocked changes from false to true', () => {
      const { rerender } = renderHook(
        ({ locked }) => useScrollLock(locked),
        {
          initialProps: { locked: false },
        }
      );

      expect(document.body.style.overflow).not.toBe('hidden');

      rerender({ locked: true });

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should unlock when isLocked changes from true to false', () => {
      document.body.style.overflow = 'auto';

      const { rerender } = renderHook(
        ({ locked }) => useScrollLock(locked),
        {
          initialProps: { locked: true },
        }
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender({ locked: false });

      expect(document.body.style.overflow).toBe('auto');
    });

    it('should handle rapid toggle', () => {
      const { rerender } = renderHook(
        ({ locked }) => useScrollLock(locked),
        {
          initialProps: { locked: false },
        }
      );

      rerender({ locked: true });
      expect(document.body.style.overflow).toBe('hidden');

      rerender({ locked: false });
      expect(document.body.style.overflow).toBe('');

      rerender({ locked: true });
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  describe('edge cases', () => {
    it('should handle case where getComputedStyle returns empty overflow', () => {
      // Mock getComputedStyle to return empty overflow
      const originalGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = vi.fn().mockReturnValue({
        overflow: '',
      });

      renderHook(() => useScrollLock(true));

      expect(document.body.style.overflow).toBe('hidden');

      window.getComputedStyle = originalGetComputedStyle;
    });

    it('should handle negative scrollbar width (edge case)', () => {
      // Mock negative scrollbar (shouldn't happen, but just in case)
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1000,
      });
      Object.defineProperty(document.body, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1010, // Impossible but testing edge case
      });

      renderHook(() => useScrollLock(true));

      // Should not add negative padding
      expect(document.body.style.paddingRight).toBe('');
    });
  });
});
