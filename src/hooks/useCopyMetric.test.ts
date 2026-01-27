import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useCopyMetric } from './useCopyMetric';
import type { FontMetricsState } from '@/pages/tools/PrecisionTypographyToolkit/context';

describe('useCopyMetric', () => {
  let mockState: FontMetricsState;
  let writeTextMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Setup mock state with all required properties
    mockState = {
      fontFamily: 'Arial',
      fontSize: 100,
      lineHeight: 1.2,
      fontMetrics: {
        familyName: 'Arial',
        capHeight: 0.7,
        ascent: 0.9,
        descent: -0.2,
        lineGap: 0.1,
        unitsPerEm: 1000,
        xHeight: 0.5,
        xWidthAvg: 0.5,
      },
    } as FontMetricsState;

    // Mock clipboard API
    writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    // Mock console.warn
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });

  describe('basic functionality', () => {
    it('should initialize with null copied state', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      expect(result.current.copied).toBeNull();
      expect(result.current.announceMessage).toBe('');
    });

    it('should return copyMetric and isCopied functions', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      expect(typeof result.current.copyMetric).toBe('function');
      expect(typeof result.current.isCopied).toBe('function');
    });
  });

  describe('copyMetric', () => {
    it('should copy capHeight raw value to clipboard', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      expect(writeTextMock).toHaveBeenCalledWith(expect.any(String));
    });

    it('should copy capHeight css value to clipboard', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('capHeight', 'css');
      });

      expect(writeTextMock).toHaveBeenCalledWith(expect.any(String));
    });

    it('should update copied state after copying', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      expect(result.current.copied).toEqual({
        id: 'capHeight',
        type: 'raw',
      });
    });

    it('should set announceMessage for screen readers', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('capHeight', 'css');
      });

      expect(result.current.announceMessage).toContain('Cap Height');
      expect(result.current.announceMessage).toContain('css');
    });

    it('should warn and return early for invalid metric ID', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('invalidMetric', 'raw');
      });

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('No metric data found')
      );
      expect(writeTextMock).not.toHaveBeenCalled();
      expect(result.current.copied).toBeNull();
    });
  });

  describe('isCopied', () => {
    it('should return true for copied metric and type', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      expect(result.current.isCopied('capHeight', 'raw')).toBe(true);
    });

    it('should return false for different metric', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      expect(result.current.isCopied('xHeight', 'raw')).toBe(false);
    });

    it('should return false for different type', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      expect(result.current.isCopied('capHeight', 'css')).toBe(false);
    });

    it('should return false when nothing is copied', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      expect(result.current.isCopied('capHeight', 'raw')).toBe(false);
    });
  });

  describe('timeout behavior', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should reset copied state after default timeout (1500ms)', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      expect(result.current.copied).not.toBeNull();

      act(() => {
        vi.advanceTimersByTime(1500);
      });

      expect(result.current.copied).toBeNull();
      expect(result.current.announceMessage).toBe('');
    });

    it('should reset copied state after custom timeout', () => {
      const { result } = renderHook(() =>
        useCopyMetric({ state: mockState, timeout: 3000 })
      );

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      expect(result.current.copied).not.toBeNull();

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.copied).toBeNull();
    });

    it('should not reset before timeout completes', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.copied).not.toBeNull();
    });
  });

  describe('multiple metrics', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should handle copying different metrics in sequence', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      expect(result.current.isCopied('capHeight', 'raw')).toBe(true);

      act(() => {
        result.current.copyMetric('xHeight', 'css');
      });

      expect(result.current.isCopied('capHeight', 'raw')).toBe(false);
      expect(result.current.isCopied('xHeight', 'css')).toBe(true);
    });

    it('should override previous copy when copying new metric', () => {
      const { result } = renderHook(() => useCopyMetric({ state: mockState }));

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      act(() => {
        result.current.copyMetric('capHeight', 'css');
      });

      expect(result.current.isCopied('capHeight', 'raw')).toBe(false);
      expect(result.current.isCopied('capHeight', 'css')).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle copying with zero timeout', () => {
      vi.useFakeTimers();
      const { result } = renderHook(() =>
        useCopyMetric({ state: mockState, timeout: 0 })
      );

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      expect(result.current.copied).not.toBeNull();

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(result.current.copied).toBeNull();
      vi.useRealTimers();
    });

    it('should handle state updates during timeout', () => {
      vi.useFakeTimers();
      const { result, rerender } = renderHook(
        ({ state }) => useCopyMetric({ state }),
        {
          initialProps: { state: mockState },
        }
      );

      act(() => {
        result.current.copyMetric('capHeight', 'raw');
      });

      // Update state with new fontSize
      const newState = {
        ...mockState,
        fontSize: 200,
      };

      rerender({ state: newState });

      act(() => {
        vi.advanceTimersByTime(1500);
      });

      expect(result.current.copied).toBeNull();
      vi.useRealTimers();
    });
  });
});
