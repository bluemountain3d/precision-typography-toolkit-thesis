// src/components/ui/Image/Image.utils.ts

import type {
  ResponsiveAspectRatio,
  AspectRatioBreakpoint,
} from './Image.types';

/**
 * Helper type extracting the single value part from the ResponsiveAspectRatio union.
 * Excludes the responsive object variant to provide a clean return type.
 *
 * @remarks
 * This type represents a resolved aspect ratio value after breakpoint logic has been applied.
 * It can be a string ('16/9'), number (1.777), or tuple ([16, 9]).
 */
type SingleAspectRatio = Exclude<
  ResponsiveAspectRatio,
  Partial<Record<AspectRatioBreakpoint, ResponsiveAspectRatio>>
>;

/**
 * Determines which aspect ratio value to use based on current viewport breakpoint.
 *
 * @param aspectRatio - Aspect ratio configuration (fixed value or responsive object)
 * @param isMobile - Whether viewport is at mobile breakpoint (up to tablet)
 * @param isDesktop - Whether viewport is at desktop breakpoint (laptop and up)
 * @returns Resolved aspect ratio value or undefined if none specified
 *
 * @remarks
 * Resolution logic:
 * 1. If aspectRatio is a simple value (string/number/tuple), return it directly
 * 2. If aspectRatio is a responsive object, apply cascade fallback logic:
 *    - Desktop: desktop → tablet → mobile → undefined
 *    - Tablet: tablet → mobile → desktop → undefined
 *    - Mobile: mobile → tablet → desktop → undefined
 *
 * @example
 * // Fixed aspect ratio (string)
 * getAspectRatioForBreakpoint('16/9', false, true) // → '16/9'
 *
 * @example
 * // Fixed aspect ratio (tuple)
 * getAspectRatioForBreakpoint([16, 9], false, true) // → [16, 9]
 *
 * @example
 * // Fixed aspect ratio (decimal)
 * getAspectRatioForBreakpoint(1.777, false, true) // → 1.777
 *
 * @example
 * // Responsive object on desktop
 * getAspectRatioForBreakpoint(
 *   { mobile: '1/1', desktop: '16/9' },
 *   false, // not mobile
 *   true   // is desktop
 * ) // → '16/9'
 *
 * @example
 * // Responsive object with fallback cascade
 * getAspectRatioForBreakpoint(
 *   { mobile: '1/1' }, // Only mobile defined
 *   false, // not mobile
 *   true   // is desktop
 * ) // → '1/1' (falls back to mobile value)
 *
 * @example
 * // No aspect ratio specified
 * getAspectRatioForBreakpoint(undefined, true, false) // → undefined
 */
export const getAspectRatioForBreakpoint = (
  aspectRatio: ResponsiveAspectRatio | undefined,
  isMobile: boolean,
  isDesktop: boolean
): SingleAspectRatio | undefined => {
  if (!aspectRatio) {
    return undefined;
  }

  // CHECK 1: Is it an Array? (Tuple format [16, 9])
  // Arrays are objects in JS, so we must check this BEFORE checking for generic objects.
  if (Array.isArray(aspectRatio)) {
    return aspectRatio;
  }

  // CHECK 2: Is it a primitive? (String '16/9' or Number 1.777)
  // If it's not an object, it's a fixed value.
  if (typeof aspectRatio !== 'object') {
    return aspectRatio;
  }

  // CHECK 3: It must be a Responsive Object now
  // We cast it to ensure TS understands it's the Record type here
  const responsive = aspectRatio as Partial<
    Record<AspectRatioBreakpoint, SingleAspectRatio>
  >;
  const { mobile, tablet, desktop } = responsive;

  // Desktop (Laptop and up) -> Cascade: desktop → tablet → mobile → undefined
  if (isDesktop) {
    return desktop ?? tablet ?? mobile ?? undefined;
  }

  // Tablet (Not mobile, not desktop) -> Cascade: tablet → mobile → desktop → undefined
  if (!isMobile && !isDesktop) {
    return tablet ?? mobile ?? desktop ?? undefined;
  }

  // Mobile -> Cascade: mobile → tablet → desktop → undefined
  return mobile ?? tablet ?? desktop ?? undefined;
};

/**
 * Converts an aspect ratio value to a CSS-compatible aspect-ratio string.
 *
 * @param aspectRatio - Aspect ratio in string, number, or tuple format
 * @returns CSS aspect-ratio value or undefined if invalid/not provided
 *
 * @remarks
 * Supported formats:
 * - String: '16/9' → '16 / 9' (adds spaces for CSS)
 * - Tuple: [16, 9] → '16 / 9' (validates length)
 * - Number: 1.777 → '1.777' (direct conversion)
 * - undefined: undefined (allows natural image dimensions)
 *
 * @example
 * // String format
 * formatAspectRatio('16/9') // → '16 / 9'
 *
 * @example
 * // Tuple format
 * formatAspectRatio([16, 9]) // → '16 / 9'
 *
 * @example
 * // Number format
 * formatAspectRatio(1.777) // → '1.777'
 *
 * @example
 * // Invalid tuple (warns and returns undefined)
 * formatAspectRatio([16]) // → undefined (console warning)
 *
 * @example
 * // No aspect ratio (natural dimensions)
 * formatAspectRatio(undefined) // → undefined
 */
export const formatAspectRatio = (
  aspectRatio: SingleAspectRatio | undefined
): string | undefined => {
  if (!aspectRatio) {
    return undefined;
  }

  // String format: '16/9' → '16 / 9'
  if (typeof aspectRatio === 'string') {
    return aspectRatio.replace('/', ' / ');
  }

  // Tuple format: [16, 9] → '16 / 9'
  if (Array.isArray(aspectRatio)) {
    const asArray = aspectRatio as number[]; // Safe cast
    if (asArray.length !== 2) {
      console.warn(
        `Invalid aspect ratio tuple: expected 2 values, got ${asArray.length}`
      );
      return undefined;
    }
    return `${asArray[0]} / ${asArray[1]}`;
  }

  // Number format: 1.777 → '1.777'
  return aspectRatio.toString();
};

/**
 * Clamps a numeric value between minimum and maximum bounds.
 *
 * @param value - The value to clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns The clamped value
 *
 * @internal
 * Helper function used by formatFocusPoint to ensure percentage values stay within 0-100 range.
 *
 * @example
 * clamp(150, 0, 100) // → 100
 * clamp(-20, 0, 100) // → 0
 * clamp(50, 0, 100)  // → 50
 */
const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Formats focus point coordinates to a CSS object-position value.
 *
 * @param focusPoint - Focus point as [x%, y%] tuple (0-100 range for each axis)
 * @returns CSS object-position value or undefined if not provided
 *
 * @remarks
 * - Values are automatically clamped to 0-100% range
 * - Returns undefined if focusPoint is not provided (lets CSS handle default centering)
 * - Invalid tuples (not exactly 2 values) return undefined
 *
 * @example
 * // Center-right, upper third
 * formatFocusPoint([70, 30]) // → '70% 30%'
 *
 * @example
 * // Values automatically clamped
 * formatFocusPoint([150, -20]) // → '100% 0%'
 *
 * @example
 * // No focus point (center is default)
 * formatFocusPoint(undefined) // → undefined
 *
 * @example
 * // Invalid tuple
 * formatFocusPoint([50] as any) // → undefined
 */
export const formatFocusPoint = (
  focusPoint: [number, number] | undefined
): string | undefined => {
  // Return undefined to let CSS handle default (center)
  if (!focusPoint) {
    return undefined;
  }

  // Validate tuple has exactly 2 values
  if (focusPoint.length !== 2) {
    return undefined;
  }

  // Clamp values to valid percentage range (0-100)
  const x = clamp(focusPoint[0], 0, 100);
  const y = clamp(focusPoint[1], 0, 100);

  return `${x}% ${y}%`;
};
