/**
 * Font metrics context exports
 *
 * Barrel export for cleaner imports throughout the application.
 *
 * @example
 * ```tsx
 * import { useFontMetrics, prepareFontMetricsState } from './context';
 * ```
 */

export { FontMetricsProvider, useFontMetrics } from './FontMetricsContext';
export { prepareFontMetricsState } from './fontMetricsReducer';
export type {
  FontMetricsState,
  FontMetricsAction,
} from './FontMetricsContext.types';
