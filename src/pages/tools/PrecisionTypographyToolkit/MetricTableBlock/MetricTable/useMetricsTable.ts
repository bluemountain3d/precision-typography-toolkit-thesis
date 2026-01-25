import { useState } from 'react';
import { useFontMetrics } from '../../context';
import { tableToVisualizerMap } from './MetricTable.utils';
import type { MetricRow } from './MetricTable.types';
import { useCopyMetric } from '@/hooks';

/**
 * Custom hook for managing MetricTable state and interactions.
 *
 * Handles:
 * - Copy-to-clipboard functionality for metric values
 * - Metric dialog open/close state
 * - Row click interactions for visualizer highlighting
 * - Integration with font metrics context
 *
 * @hook
 * @returns {Object} Table state and event handlers
 * @returns {FontMetricsState} state - Current font metrics
 * @returns {function} isCopied - Check if a specific metric value is copied
 * @returns {function} handleCopy - Copy metric value to clipboard
 * @returns {function} handleOpenDialog - Open metric information dialog
 * @returns {function} handleCloseDialog - Close metric information dialog
 * @returns {function} handleRowClick - Handle table row click events
 * @returns {boolean} showMetricDialog - Whether dialog is currently visible
 * @returns {string} infoMetric - ID of metric currently shown in dialog
 *
 * @example
 * ```tsx
 * const {
 *   state,
 *   isCopied,
 *   handleCopy,
 *   handleRowClick
 * } = useMetricTable();
 * ```
 */
export const useMetricTable = () => {
  const { state, setSelectedMetric, dispatch } = useFontMetrics();
  const { copied, copyMetric, isCopied } = useCopyMetric({ state });

  const [showMetricDialog, setShowMetricDialog] = useState(false);
  const [infoMetric, setInfoMetric] = useState('');

  const [announceMessage, setAnnounceMessage] = useState('');

  /**
   * Copies a metric value to clipboard with visual feedback.
   *
   * @param {string} metric - Metric ID to copy (e.g., 'capHeight')
   * @param {'raw' | 'css'} type - Value type to copy
   *
   * @example
   * ```ts
   * handleCopy('capHeight', 'css'); // Copies "0.728em"
   * handleCopy('capHeight', 'raw'); // Copies "728"
   * ```
   */
  const handleCopy = (
    metricId: string,
    type: 'raw' | 'css',
    metricName: string
  ) => {
    copyMetric(metricId, type);

    setAnnounceMessage(`${metricName} ${type} value copied`);
    setTimeout(() => setAnnounceMessage(''), 1000);
  };

  /**
   * Opens the metric information dialog for detailed view.
   *
   * @param {MetricRow} row - Table row data for the metric
   */
  const handleOpenDialog = (row: MetricRow) => {
    setInfoMetric(row.id);
    setShowMetricDialog(true);
  };

  /**
   * Closes the metric information dialog.
   */
  const handleCloseDialog = () => {
    setShowMetricDialog(false);
  };

  /**
   * Handles table row click to toggle visualizer highlighting.
   *
   * Behavior:
   * - If metric is visualizable: Toggle highlight in SVG visualizer
   * - If not visualizable: Clear any active highlights
   * - On mobile breakpoint: Also opens metric dialog
   *
   * @param {MetricRow} row - Clicked row data
   * @param {number} _index - Row index (unused)
   * @param {boolean} isBreakpoint - Whether mobile breakpoint is active
   */
  const handleRowClick = (
    row: MetricRow,
    _index: number,
    isBreakpoint: boolean
  ) => {
    const visualizerKey = tableToVisualizerMap[row.id];

    if (!visualizerKey) {
      setSelectedMetric(null);
      if (isBreakpoint) {
        handleOpenDialog(row);
      }
      return;
    }

    const isCurrentlySelected = state.selectedMetric === visualizerKey;
    const nextMetric = isCurrentlySelected ? null : visualizerKey;

    setSelectedMetric(nextMetric);

    if (isBreakpoint && !isCurrentlySelected) {
      handleOpenDialog(row);
    }
  };

  /**
   * Handles category selection change.
   *
   * Updates the font category in state and persists to localStorage.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - Select change event
   *
   * @example
   * ```tsx
   * <select onChange={handleCategorySelect}>
   *   <option value="sans-serif">Sans Serif</option>
   * </select>
   * ```
   */
  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'UPDATE_CATEGORY', payload: e.target.value });
  };

  return {
    state,
    copied,
    isCopied,
    showMetricDialog,
    infoMetric,
    handleCopy,
    handleOpenDialog,
    handleCloseDialog,
    handleRowClick,
    handleCategorySelect,
    announceMessage,
  };
};
