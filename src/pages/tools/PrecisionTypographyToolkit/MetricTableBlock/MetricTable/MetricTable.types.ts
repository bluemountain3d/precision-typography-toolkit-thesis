import type React from 'react';

/**
 * Represents a single row in the metrics table
 *
 * @interface MetricRow
 * @property {string} id - Unique identifier for the metric (e.g., 'capHeight', 'xHeight')
 * @property {string} metric - Human-readable name displayed in UI (e.g., 'Cap Height')
 * @property {number | string | null} rawValue - Raw value in UPM units or descriptive string
 * @property {number | string | null} normalizedValue - Normalized CSS value (typically in em units)
 * @property {string | null} comment - Brief description of what the metric represents
 *
 * @example
 * ```ts
 * const row: MetricRow = {
 *   id: 'capHeight',
 *   metric: 'Cap Height',
 *   rawValue: 728,
 *   normalizedValue: '0.728em',
 *   comment: 'Height of a capital letter'
 * };
 * ```
 */
export type MetricRow = {
  id: string;
  metric: React.ReactNode;
  rawValue: React.ReactNode | number | null;
  normalizedValue: number | string | null;
  comment: string | null;
};
