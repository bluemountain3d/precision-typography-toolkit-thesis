export type MetricRow = {
  id: string;
  metric: string;
  rawValue: number | string | null;
  normalizedValue: number | string | null;
  comment: string | null;
};
