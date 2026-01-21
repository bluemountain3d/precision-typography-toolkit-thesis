import { describe, it, expect } from 'vitest';
import { getCorrectedAscenderDescender } from '@utils/getCorrectedMetrics';

describe('getCorrectedAscenderDescender', () => {
  describe('when total height equals unitsPerEm', () => {
    it('should return original values unchanged', () => {
      const result = getCorrectedAscenderDescender(800, -200, 1000);

      expect(result).toEqual({
        upmAscender: 800,
        upmDescender: 200,
      });
    });

    it('should handle zero descender', () => {
      const result = getCorrectedAscenderDescender(1000, 0, 1000);

      expect(result).toEqual({
        upmAscender: 1000,
        upmDescender: 0,
      });
    });
  });

  describe('when total height is less than unitsPerEm', () => {
    it('should return original values unchanged', () => {
      const result = getCorrectedAscenderDescender(600, -200, 1000);

      expect(result).toEqual({
        upmAscender: 600,
        upmDescender: 200,
      });
    });

    it('should handle small values', () => {
      const result = getCorrectedAscenderDescender(100, -50, 1000);

      expect(result).toEqual({
        upmAscender: 100,
        upmDescender: 50,
      });
    });
  });

  describe('when total height exceeds unitsPerEm', () => {
    it('should reduce both ascender and descender by half the overshoot', () => {
      // Total: 900 + 300 = 1200, overshoot = 200, half = 100
      const result = getCorrectedAscenderDescender(900, -300, 1000);

      expect(result).toEqual({
        upmAscender: 800,
        upmDescender: 200,
      });
    });

    it('should handle large overshoot', () => {
      // Total: 1000 + 500 = 1500, overshoot = 500, half = 250
      const result = getCorrectedAscenderDescender(1000, -500, 1000);

      expect(result).toEqual({
        upmAscender: 750,
        upmDescender: 250,
      });
    });

    it('should handle small overshoot', () => {
      // Total: 810 + 200 = 1010, overshoot = 10, half = 5
      const result = getCorrectedAscenderDescender(810, -200, 1000);

      expect(result).toEqual({
        upmAscender: 805,
        upmDescender: 195,
      });
    });
  });

  describe('edge cases', () => {
    it('should handle different unitsPerEm values', () => {
      // Total: 1600 + 400 = 2000, matches unitsPerEm
      const result = getCorrectedAscenderDescender(1600, -400, 2000);

      expect(result).toEqual({
        upmAscender: 1600,
        upmDescender: 400,
      });
    });

    it('should always return positive descender', () => {
      const result = getCorrectedAscenderDescender(900, -300, 1000);

      expect(result.upmDescender).toBeGreaterThanOrEqual(0);
    });

    it('should handle negative descender input correctly', () => {
      // Function uses Math.abs() internally
      const result1 = getCorrectedAscenderDescender(800, -200, 1000);
      const result2 = getCorrectedAscenderDescender(800, 200, 1000);

      expect(result1).toEqual(result2);
    });
  });

  describe('typical font scenarios', () => {
    it('should handle typical sans-serif proportions', () => {
      // Common: ascender ~900, descender ~-250 in 1000 UPM
      const result = getCorrectedAscenderDescender(900, -250, 1000);

      expect(result).toEqual({
        upmAscender: 825,
        upmDescender: 175,
      });
    });

    it('should handle typical serif proportions', () => {
      // Common: ascender ~750, descender ~-250 in 1000 UPM
      const result = getCorrectedAscenderDescender(750, -250, 1000);

      expect(result).toEqual({
        upmAscender: 750,
        upmDescender: 250,
      });
    });

    it('should handle 2048 UPM font (common in OpenType)', () => {
      const result = getCorrectedAscenderDescender(1638, -410, 2048);

      expect(result).toEqual({
        upmAscender: 1638,
        upmDescender: 410,
      });
    });
  });
});
