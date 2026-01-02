export type MetricRow = {
  metric: string;
  rawValue: number | string | null;
  normalizedValue: number | string | null;
  comment: string | null;
};
