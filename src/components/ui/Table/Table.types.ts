export interface TableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  onRowClick?: (row: T, index: number) => void;
  className?: string;
  caption?: string; // A11y <caption>
  copyableByDefault?: boolean;
  hideColumnsAt?: string;
}

export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  copyable: boolean;
  hideAt?: string;
};
