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

export const breakpointsRem = {
  mobile: pxToRem(breakpoints.mobile),
  phablet: pxToRem(breakpoints.phablet),
  tablet: pxToRem(breakpoints.tablet),
  tabletLarge: pxToRem(breakpoints.tabletLarge),
  laptop: pxToRem(breakpoints.laptop),
  desktop: pxToRem(breakpoints.desktop),
} as const;

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

export type BreakpointQuery = keyof typeof queries;
