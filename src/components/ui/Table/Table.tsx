import styles from './Table.module.scss';
import classNames from 'clsx';
import type { TableProps } from './Table.types';
import { CopyButton } from './CopyButton/CopyButton';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';

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
    const shouldHide = window.matchMedia(`(max-width: ${col.hideAt})`).matches;
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
                    <span>{String(value)}</span>
                    {!isUnderBreakpoint && isCopyable && hasValue && (
                      <CopyButton value={String(value)} />
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
