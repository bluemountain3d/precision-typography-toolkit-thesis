import type { BreakpointQuery } from '@/types';

/**
 * Generic table component props
 * @template T - The type of data objects in the table
 */
export interface TableProps<T extends Record<string, any>> {
  /** Array of data objects to display in table rows */
  data: T[];
  /** Column configuration defining what data to show and how */
  columns: ColumnConfig<T>[];
  /**
   * Callback fired when a table row is clicked
   * @param row - The data object for the clicked row
   * @param index - The row index
   */
  onRowClick?: (row: T, index: number) => void;
  className?: string;
  /**
   * Accessible table caption (rendered as <caption> element)
   * Recommended for screen readers to understand table purpose
   */
  caption?: string;
  /**
   * Makes all cells copyable by default unless overridden per column
   * @default false
   */
  copyableByDefault?: boolean;
  /**
   * Breakpoint at which columns with hideAt are hidden and dialog mode activates
   * Uses predefined breakpoint queries from design system
   */
  hideColumnsAt?: BreakpointQuery;

  activeRowId?: string | number | null;
  rowIdKey?: keyof T;
}

/**
 * Column configuration for table display
 * @template T - The type of data objects in the table
 */
export type ColumnConfig<T> = {
  /** Property key from data object to display in this column */
  key: keyof T;
  /** Column header label */
  label: string;
  /** Whether this column's cells should show copy-to-clipboard buttons */
  copyable: boolean;
  /**
   * Breakpoint at which this column should be hidden from table view
   * Hidden columns can be shown in a dialog when row is clicked
   */
  hideAt?: BreakpointQuery;
  /** Custom render function for cell content */
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
};
