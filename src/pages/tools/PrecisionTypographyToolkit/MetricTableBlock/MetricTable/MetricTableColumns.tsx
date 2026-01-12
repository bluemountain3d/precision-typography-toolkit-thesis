import { Flex } from '@/components/layout/Flex';
import { Icon } from '@/components/ui/Icon';
import { InfoSimpleIcon, CopyIcon, SuccessIcon } from '@/assets/icons';
import type { ColumnConfig } from '@/components/ui/Table';
import type { MetricRow } from './MetricTable.types';
import styles from './MetricsTable.module.scss';

/**
 * Parameters for generating metric table columns.
 *
 * @interface GetColumnsParams
 * @property {boolean} [isBreakpoint] - Whether mobile/tablet breakpoint is active. When true, copy buttons are hidden.
 * @property {function} isCopied - Check if a metric value has been copied
 * @property {function} onCopy - Callback when copy button is clicked
 * @property {function} onInfo - Callback when info button is clicked
 */
interface GetColumnsParams {
  isBreakpoint?: boolean;
  isCopied: (metricId: string, type: 'raw' | 'css') => boolean;
  onCopy: (metric: string, type: 'raw' | 'css') => void;
  onInfo: (row: MetricRow) => void;
}

/**
 * Generates column configuration for the metrics table.
 *
 * Creates four columns:
 * 1. **Metric**: Name of the font metric
 * 2. **Raw**: Raw value with copy button
 * 3. **CSS**: Normalized CSS value with copy button
 * 4. **Comment**: Description with info button (hidden on mobile)
 *
 * Copy buttons are conditionally rendered - only shown when value is not "-".
 *
 * @param {GetColumnsParams} params - Column configuration parameters
 * @returns {ColumnConfig<MetricRow>[]} Array of column configurations
 *
 * @example
 * ```tsx
 * const columns = getMetricTableColumns({
 *   isCopied: (id, type) => copied?.id === id && copied?.type === type,
 *   onCopy: handleCopy,
 *   onInfo: handleOpenDialog,
 * });
 * ```
 */
export const getMetricTableColumns = ({
  isBreakpoint,
  isCopied,
  onCopy,
  onInfo,
}: GetColumnsParams): ColumnConfig<MetricRow>[] => [
  { key: 'metric', label: 'Metric' },

  {
    key: 'rawValue',
    label: 'Raw',
    render: (value, row) => {
      const showButton = value !== '-' && !isBreakpoint;

      return (
        <Flex
          as="div"
          justifyContent="space-between"
          alignItems="center"
          gap="xs"
          width="full"
          className={styles['metrics-table__cell']}
        >
          <span className={styles['metrics-table__text']}>{String(value)}</span>
          {showButton && (
            <button
              className={styles['metrics-table__button']}
              onClick={(e) => {
                e.stopPropagation();
                onCopy(row.id, 'raw');
              }}
              aria-label={`Copy ${row.metric} raw data`}
            >
              <Icon
                icon={isCopied(row.id, 'raw') ? SuccessIcon : CopyIcon}
                fill={isCopied(row.id, 'raw') ? 'success' : 'primary'}
              />
            </button>
          )}
        </Flex>
      );
    },
  },

  {
    key: 'normalizedValue',
    label: 'CSS',
    render: (value, row) => {
      const showButton = value !== '-' && !isBreakpoint;

      return (
        <Flex
          as="div"
          justifyContent="space-between"
          alignItems="center"
          gap="xs"
          width="full"
          className={styles['metrics-table__cell']}
        >
          <span className={styles['metrics-table__text']}>{String(value)}</span>
          {showButton && (
            <button
              className={styles['metrics-table__button']}
              onClick={(e) => {
                e.stopPropagation();
                onCopy(row.id, 'css');
              }}
              aria-label={`Copy ${row.metric} css data`}
            >
              <Icon
                icon={isCopied(row.id, 'css') ? SuccessIcon : CopyIcon}
                fill={isCopied(row.id, 'css') ? 'success' : 'primary'}
              />
            </button>
          )}
        </Flex>
      );
    },
  },

  {
    key: 'comment',
    label: 'Comment',
    hideAt: 'isUpToTabletLarge',
    render: (value, row) => (
      <Flex
        as="div"
        justifyContent="space-between"
        alignItems="center"
        gap="xs"
        width="full"
        className={styles['metrics-table__cell']}
      >
        <span className={styles['metrics-table__text']}>{String(value)}</span>
        <button
          className={styles['metrics-table__button']}
          onClick={(e) => {
            e.stopPropagation();
            onInfo(row);
          }}
          aria-label={`More info about ${row.id}`}
        >
          <Icon icon={InfoSimpleIcon} fill="primary" />
        </button>
      </Flex>
    ),
  },
];
