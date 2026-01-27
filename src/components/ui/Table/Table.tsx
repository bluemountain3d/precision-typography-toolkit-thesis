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
export const Table = <T extends Record<string, unknown>>({
  ariaLabelledBy,
  data,
  columns,
  onRowClick,
  hideColumnsAt,
  activeRowId,
  rowIdKey,
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
    <table
      aria-labelledby={ariaLabelledBy || undefined}
      className={classNames(styles.table, className)}
    >
      {caption && <caption>{caption}</caption>}

      <thead>
        <tr>
          {visibleColumns.map((col) => (
            <th key={String(col.key)} scope="col">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => {
          const rowId = row[(rowIdKey || 'id') as keyof T];
          const isActiveRow =
            activeRowId !== undefined && rowId === activeRowId;

          return (
            <tr
              key={rowIndex}
              className={classNames({ [styles.active]: isActiveRow })}
              // onClick={() => onRowClick?.(row, rowIndex)}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.tagName !== 'BUTTON' && !target.closest('button')) {
                  onRowClick?.(row, rowIndex);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onRowClick?.(row, rowIndex);
                }
              }}
              // tabIndex={onRowClick ? 0 : undefined}
              // role={onRowClick ? 'button' : undefined}
              // aria-pressed={isActiveRow}
              aria-selected={isActiveRow}
            >
              {visibleColumns.map((col) => {
                const value = row[col.key];
                const isCopyable = col.copyable ?? copyableByDefault;
                const hasValue =
                  value !== null && value !== '-' && value !== '';

                return (
                  <td key={String(col.key)}>
                    {col.render ? (
                      col.render(value, row, rowIndex)
                    ) : (
                      <div className={classNames(styles['table__cell'])}>
                        <span>{String(value)}</span>
                        {!isUnderBreakpoint && isCopyable && hasValue && (
                          <CopyButton value={String(value)} />
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
