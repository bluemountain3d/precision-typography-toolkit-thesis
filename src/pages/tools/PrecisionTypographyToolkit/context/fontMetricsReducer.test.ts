import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fontMetricsReducer,
  prepareFontMetricsState,
} from './fontMetricsReducer';
import { initialFontMetricsState } from './FontMetricsContext.types';
import type { FontMetricsState } from './FontMetricsContext.types';
import type { FontMetrics } from '@models';

// Mock localStorage
vi.mock('@/utils/localStorage', () => ({
  setItem: vi.fn(),
  getItem: vi.fn(),
  removeItem: vi.fn(),
}));

describe('prepareFontMetricsState', () => {
  const mockFile = new File(['data'], 'test.ttf');
  const mockMetrics: FontMetrics = {
    textVariantWidths: { Hx: 1100 },
    familyName: 'Test Font',
    fontSlug: 'test-font',
    subFamilyName: 'Regular',
    weightClass: 400,
    category: 'sans-serif',
    unitsPerEm: 1000,
    hheaAscender: 900,
    upmAscender: 800,
    hheaDescender: -300,
    upmDescender: -200,
    capHeight: 700,
    xHeight: 500,
    avgCharWidth: 600,
    lineGap: 0,
    topTrimRaw: 100,
    bottomTrimRaw: 100,
    lsbAdjustRaw: 50,
    rsbAdjustRaw: 50,
    features: ['kern'],
    isVariable: false,
    variableAxis: null,
  };

  it('should create complete state from metrics', () => {
    const result = prepareFontMetricsState(mockFile, mockMetrics, 'TestFont');

    expect(result.fontFamily).toBe('Test Font');
    expect(result.unitsPerEm).toBe(1000);
    expect(result.capHeight).toBe(700);
  });

  it('should calculate ratios correctly', () => {
    const result = prepareFontMetricsState(mockFile, mockMetrics, 'TestFont');

    expect(result.capHeightRatio).toBe(0.7);
    expect(result.xHeightRatio).toBe(0.5);
  });

  it('should handle custom line height', () => {
    const result = prepareFontMetricsState(
      mockFile,
      mockMetrics,
      'TestFont',
      2.0
    );

    // halfLeading = (2.0 * 1000 - 1000) / 2 = 500
    // topTrim = 500 + 100 = 600
    expect(result.lineHeightMultiplier).toBe(2.0);
    expect(result.topTrim).toBe(600);
  });
});

describe('fontMetricsReducer', () => {
  describe('SET_SELECTED_METRIC', () => {
    it('should update selected metric', () => {
      const state = initialFontMetricsState;
      const result = fontMetricsReducer(state, {
        type: 'SET_SELECTED_METRIC',
        payload: 'capHeight',
      });

      expect(result.selectedMetric).toBe('capHeight');
    });
  });

  describe('FONT_UPLOAD_START', () => {
    it('should set loading state', () => {
      const state = initialFontMetricsState;
      const result = fontMetricsReducer(state, {
        type: 'FONT_UPLOAD_START',
      });

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('FONT_UPLOAD_SUCCESS', () => {
    it('should save metrics and clear loading', () => {
      const mockFile = new File(['data'], 'test.ttf');
      const newState: FontMetricsState = {
        ...initialFontMetricsState,
        fontFile: mockFile,
        fontFamily: 'New Font',
        unitsPerEm: 1000,
      };

      const result = fontMetricsReducer(initialFontMetricsState, {
        type: 'FONT_UPLOAD_SUCCESS',
        payload: newState,
      });

      expect(result.isLoading).toBe(false);
      expect(result.fontFamily).toBe('New Font');
    });
  });

  describe('FONT_UPLOAD_ERROR', () => {
    it('should reset to initial state with error', () => {
      const state: FontMetricsState = {
        ...initialFontMetricsState,
        fontFamily: 'Test Font',
      };

      const result = fontMetricsReducer(state, {
        type: 'FONT_UPLOAD_ERROR',
        payload: 'Failed to parse',
      });

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Failed to parse');
      expect(result.fontFamily).toBeNull();
    });
  });

  describe('RESET_FONT', () => {
    it('should reset to initial state', () => {
      const state: FontMetricsState = {
        ...initialFontMetricsState,
        fontFamily: 'Test Font',
        unitsPerEm: 1000,
      };

      const result = fontMetricsReducer(state, { type: 'RESET_FONT' });

      expect(result).toEqual(initialFontMetricsState);
    });
  });

  describe('UPDATE_LINE_HEIGHT', () => {
    it('should recalculate trim values', () => {
      const state: FontMetricsState = {
        ...initialFontMetricsState,
        unitsPerEm: 1000,
        topTrimRaw: 100,
        bottomTrimRaw: 100,
        lineHeightMultiplier: 1.5,
      };

      const result = fontMetricsReducer(state, {
        type: 'UPDATE_LINE_HEIGHT',
        payload: 2.0,
      });

      expect(result.lineHeightMultiplier).toBe(2.0);
      expect(result.topTrim).toBe(600); // (2.0 * 1000 - 1000) / 2 + 100
    });

    it('should return unchanged if unitsPerEm is null', () => {
      const state: FontMetricsState = {
        ...initialFontMetricsState,
        unitsPerEm: null,
      };

      const result = fontMetricsReducer(state, {
        type: 'UPDATE_LINE_HEIGHT',
        payload: 2.0,
      });

      expect(result).toBe(state);
    });
  });

  describe('UPDATE_CATEGORY', () => {
    it('should update category', () => {
      const state: FontMetricsState = {
        ...initialFontMetricsState,
        category: 'sans-serif',
      };

      const result = fontMetricsReducer(state, {
        type: 'UPDATE_CATEGORY',
        payload: 'serif',
      });

      expect(result.category).toBe('serif');
    });
  });
});
