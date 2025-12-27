/**
 * Breakpoint definitions in pixels
 * Used as base values for responsive design system
 */
export const breakpoints = {
  mobile: 320,
  phablet: 676,
  tablet: 768,
  tabletLarge: 1024,
  laptop: 1152,
  desktop: 1536,
} as const;

/**
 * Helper for getting raw value
 */
const pxToRemValue = (px: string | number) => {
  return (typeof px === 'string' ? parseFloat(px) : px) / 16;
};

/**
 * Helper to get string with unit
 */
const pxToRem = (px: string | number) => {
  return `${(typeof px === 'string' ? parseFloat(px) : px) / 16}rem`;
};

/**
 * Breakpoint values converted to rem units (px / 16)
 */
export const breakpointsRem = {
  mobile: pxToRem(breakpoints.mobile),
  phablet: pxToRem(breakpoints.phablet),
  tablet: pxToRem(breakpoints.tablet),
  tabletLarge: pxToRem(breakpoints.tabletLarge),
  laptop: pxToRem(breakpoints.laptop),
  desktop: pxToRem(breakpoints.desktop),
} as const;

/**
 * Predefined media query strings for responsive design.
 * Use with useMediaQuery hook or CSS-in-JS solutions.
 *
 * Naming convention:
 * - "UpTo": max-width queries (< breakpoint) - excludes the breakpoint itself
 * - "AndUp": min-width queries (>= breakpoint) - includes the breakpoint
 * - "AndDown": max-width queries (<= breakpoint) - includes the breakpoint
 * - "Only": specific range between two breakpoints
 *
 * @example
 * import { queries } from '@/types';
 * import { useMediaQuery } from '@/hooks';
 *
 * const isMobile = useMediaQuery(queries.isUpToTablet);
 * const isDesktop = useMediaQuery(queries.isDesktopAndUp);
 * const isTabletOnly = useMediaQuery(queries.isTabletOnly);
 */
export const queries = {
  /**
   * Up to (excludes the breakpoint itself)
   * "Up to Tablet" usually means everything BEFORE Tablet starts (< 768px)
   */
  isUpToPhablet: `(max-width: ${pxToRemValue(breakpoints.phablet) - 0.01}rem)`,
  isUpToTablet: `(max-width: ${pxToRemValue(breakpoints.tablet) - 0.01}rem)`,
  isUpToTabletLarge: `(max-width: ${pxToRemValue(breakpoints.tabletLarge) - 0.01}rem)`,
  isUpToLaptop: `(max-width: ${pxToRemValue(breakpoints.laptop) - 0.01}rem)`,
  isUpToDesktop: `(max-width: ${pxToRemValue(breakpoints.desktop) - 0.01}rem)`,

  /**
   * And up (includes the breakpoint and larger)
   */
  isMobileAndUp: `(min-width: ${pxToRem(breakpoints.mobile)})`,
  isPhabletAndUp: `(min-width: ${pxToRem(breakpoints.phablet)})`,
  isTabletAndUp: `(min-width: ${pxToRem(breakpoints.tablet)})`,
  isTabletLargeAndUp: `(min-width: ${pxToRem(breakpoints.tabletLarge)})`,
  isLaptopAndUp: `(min-width: ${pxToRem(breakpoints.laptop)})`,
  isDesktopAndUp: `(min-width: ${pxToRem(breakpoints.desktop)})`,

  /**
   * And down (includes the breakpoint and smaller)
   * NOTE: "Tablet and Down" usually means you want to INCLUDE Tablet.
   * Therefore, max-width must be "next breakpoint" minus 0.01.
   */
  isMobileAndDown: `(max-width: ${pxToRem(breakpoints.mobile)})`,
  isPhabletAndDown: `(max-width: ${pxToRem(breakpoints.phablet)})`,
  isTabletAndDown: `(max-width: ${pxToRem(breakpoints.tablet)})`,
  isTabletLargeAndDown: `(max-width: ${pxToRem(breakpoints.tabletLarge)})`,
  isLaptopAndDown: `(max-width: ${pxToRem(breakpoints.laptop)})`,
  isDesktopAndDown: `(min-width: 0rem)`,

  /**
   * Only (specific breakpoint range)
   */
  isMobileOnly: `(min-width: ${pxToRem(breakpoints.mobile)}) and (max-width: ${pxToRemValue(breakpoints.phablet) - 0.01}rem)`,
  isPhabletOnly: `(min-width: ${pxToRem(breakpoints.phablet)}) and (max-width: ${pxToRemValue(breakpoints.tablet) - 0.01}rem)`,
  isTabletOnly: `(min-width: ${pxToRem(breakpoints.tablet)}) and (max-width: ${pxToRemValue(breakpoints.tabletLarge) - 0.01}rem)`,
  isTabletLargeOnly: `(min-width: ${pxToRem(breakpoints.tabletLarge)}) and (max-width: ${pxToRemValue(breakpoints.laptop) - 0.01}rem)`,
  isLaptopOnly: `(min-width: ${pxToRem(breakpoints.laptop)}) and (max-width: ${pxToRemValue(breakpoints.desktop) - 0.01}rem)`,
} as const;

/**
 * Type-safe query keys for use in components
 *
 * @example
 * // In component props
 * interface TableProps {
 *   hideColumnsAt?: BreakpointQuery;
 * }
 *
 * // Usage
 * <Table hideColumnsAt="isUpToTabletLarge" />
 */
export type BreakpointQuery = keyof typeof queries;
