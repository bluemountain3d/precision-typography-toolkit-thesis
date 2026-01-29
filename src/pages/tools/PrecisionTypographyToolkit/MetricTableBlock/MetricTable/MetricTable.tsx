import styles from './MetricsTable.module.scss';
import { Table } from '@/components/ui/Table';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { buildMetricsData } from './MetricTable.utils';
import { getMetricTableColumns } from './MetricTableColumns';
import { useMetricTable } from './useMetricsTable';
import { MetricDialog } from '../MetricDialog';

/**
 * MetricTable Component
 *
 * Displays font metrics in a table format with copyable values and interactive visualization.
 *
 * Features:
 * - Copy raw and CSS values to clipboard
 * - Click rows to highlight metrics in visualizer
 * - Open detailed metric dialog for more information
 * - Responsive design with mobile-optimized layout
 *
 * @component
 * @example
 * ```tsx
 * <MetricTable />
 * ```
 */
export const MetricTable = () => {
  const isBreakpoint = useMediaQuery(queries.isUpToTabletLarge);

  const {
    state,
    isCopied,
    showMetricDialog,
    infoMetric,
    handleCopy,
    handleOpenDialog,
    handleCloseDialog,
    handleRowClick,
    handleCategorySelect,
    announceMessage,
  } = useMetricTable();

  const metricsData = buildMetricsData(state);

  const columns = getMetricTableColumns({
    isBreakpoint: isBreakpoint,
    currentCategory: state.category,
    isCopied,
    onCopy: handleCopy,
    onInfo: handleOpenDialog,
    onCategoryChange: handleCategorySelect,
  });

  return (
    <>
      <Table
        ariaLabelledBy="metrics-table-heading"
        data={metricsData}
        columns={columns}
        hideColumnsAt="isUpToTabletLarge"
        className={styles['metrics-table']}
        onRowClick={(row, index) => handleRowClick(row, index, isBreakpoint)}
        activeRowId={state.selectedMetric}
        rowIdKey="id"
      />
      <div role="status" aria-live="polite" className="sr-only">
        {announceMessage}
      </div>
      {showMetricDialog && (
        <MetricDialog metric={infoMetric} onCancel={handleCloseDialog} />
      )}
    </>
  );
};
