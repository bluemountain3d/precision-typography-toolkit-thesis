import { useState } from 'react';
import { metricDialogData } from '@/utils';
import type { FontMetricsState } from '@/pages/tools/PrecisionTypographyToolkit/context';

/**
 * State object for tracking copied metric values.
 *
 * @typedef {Object} CopiedState
 * @property {string} id - Metric ID that was copied
 * @property {'raw' | 'css'} type - Type of value that was copied
 */
type CopiedState = {
  id: string;
  type: 'raw' | 'css';
} | null;

/**
 * Options for useCopyMetric hook.
 *
 * @interface UseCopyMetricOptions
 * @property {FontMetricsState} state - Current font metrics state
 * @property {number} [timeout=1500] - Duration to show "copied" feedback in ms
 */
interface UseCopyMetricOptions {
  state: FontMetricsState;
  timeout?: number;
}

/**
 * Custom hook for copying metric values to clipboard with visual feedback.
 *
 * Provides a unified interface for copying font metrics in both raw and CSS formats.
 * Automatically handles timeout-based feedback reset and supports separate copy/display values.
 *
 * @hook
 * @param {UseCopyMetricOptions} options - Hook configuration
 * @returns {Object} Copy state and utilities
 * @returns {CopiedState} copied - Currently copied metric and type (null if none)
 * @returns {function} copyMetric - Copy a metric value to clipboard
 * @returns {function} isCopied - Check if specific metric/type is copied
 *
 * @example
 * ```tsx
 * const { copyMetric, isCopied } = useCopyMetric({ state });
 *
 * // Copy value
 * copyMetric('capHeight', 'css');
 *
 * // Check if copied
 * isCopied('capHeight', 'css'); // true for 1500ms
 * ```
 */
export const useCopyMetric = ({
  state,
  timeout = 1500,
}: UseCopyMetricOptions) => {
  const [copied, setCopied] = useState<CopiedState>(null);
  const [announceMessage, setAnnounceMessage] = useState('');

  const copyMetric = (metricId: string, type: 'raw' | 'css') => {
    const metricData = metricDialogData[metricId];

    if (!metricData) {
      console.warn(`No metric data found for: ${metricId}`);
      return;
    }

    const value =
      type === 'raw'
        ? (metricData.getRawCopy?.(state) ?? metricData.getRaw(state))
        : (metricData.getCssCopy?.(state) ?? metricData.getCss(state));

    navigator.clipboard.writeText(value);
    setCopied({ id: metricId, type });

    // Announce to screen readers
    setAnnounceMessage(`${metricData.title} ${type} value copied`);

    setTimeout(() => {
      setCopied(null);
      setAnnounceMessage('');
    }, timeout);
  };

  const isCopied = (metricId: string, type: 'raw' | 'css') => {
    return copied?.id === metricId && copied?.type === type;
  };

  return {
    copied,
    copyMetric,
    isCopied,
    announceMessage,
  };
};
