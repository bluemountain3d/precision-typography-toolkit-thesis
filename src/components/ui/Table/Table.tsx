import styles from './Table.module.scss';
import classNames from 'clsx';
import type { TableProps } from './Table.types';
import { CopyButton } from './CopyButton/CopyButton';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';

/**
 * Generic, type-safe table component with responsive column visibility and copy-to-clipboard functionality.
 * Supports automatic column hiding at breakpoints and conditional rendering of copy buttons.
 *
 * @template T - The type of data objects to display
 *
 * @example
 * // Basic table with copy functionality
 * const data = [
 *   { name: 'John', age: 30, email: 'john@example.com' },
 *   { name: 'Jane', age: 25, email: 'jane@example.com' },
 * ];
 *
 * const columns = [
 *   { key: 'name', label: 'Name', copyable: true },
 *   { key: 'age', label: 'Age', copyable: false },
 *   { key: 'email', label: 'Email', copyable: true },
 * ];
 *
 * <Table data={data} columns={columns} caption="User List" />
 *
 * @example
 * // Responsive table with column hiding
 * <Table
 *   data={metricsData}
 *   columns={[
 *     { key: 'metric', label: 'Metric', copyable: false },
 *     { key: 'value', label: 'Value', copyable: true },
 *     { key: 'comment', label: 'Comment', copyable: false, hideAt: 'isUpToTabletLarge' },
 *   ]}
 *   hideColumnsAt="isUpToTabletLarge"
 *   onRowClick={(row) => console.log('Clicked:', row)}
 * />
 *
 * @example
 * // Custom cell rendering with Select component
 * <Table
 *   data={fontMetrics}
 *   columns={[
 *     { key: 'familyName', label: 'Font Family', copyable: true },
 *     {
 *       key: 'category',
 *       label: 'Category',
 *       copyable: false,
 *       render: (value, row, index) => (
 *         <Select
 *           value={value as string}
 *           onChange={(newValue) => handleCategoryChange(newValue)}
 *           options={['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy']}
 *         />
 *       )
 *     },
 *     { key: 'capHeight', label: 'Cap Height', copyable: true },
 *   ]}
 *   caption="Font Metrics"
 * />
 */
export const Table = <T,>({
  data,
  columns,
  onRowClick,
  hideColumnsAt,
  copyableByDefault = false,
  className,
  caption,
}: TableProps<T>) => {
  const queryString = hideColumnsAt ? queries[hideColumnsAt] : 'none';
  const isUnderBreakpoint = useMediaQuery(queryString);

  const visibleColumns = columns.filter((col) => {
    if (!col.hideAt) return true;
    const colQueryString = queries[col.hideAt];
    const shouldHide = window.matchMedia(colQueryString).matches;
    return !shouldHide;
  });

  return (
    <table className={classNames(styles.table, className)}>
      {caption && <caption>{caption}</caption>}

      <thead>
        <tr>
          {visibleColumns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} onClick={() => onRowClick?.(row, rowIndex)}>
            {visibleColumns.map((col) => {
              const value = row[col.key];
              const isCopyable = col.copyable ?? copyableByDefault;
              const hasValue = value !== null && value !== '-' && value !== '';

              return (
                <td key={String(col.key)}>
                  <div className={classNames(styles['table__cell'])}>
                    {col.render ? (
                      col.render(value, row, rowIndex)
                    ) : (
                      <>
                        <span>{String(value)}</span>
                        {!isUnderBreakpoint && isCopyable && hasValue && (
                          <CopyButton value={String(value)} />
                        )}
                      </>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
