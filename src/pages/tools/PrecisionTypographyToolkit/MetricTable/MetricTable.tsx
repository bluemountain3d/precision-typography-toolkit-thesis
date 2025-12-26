import { Table, type ColumnConfig } from '@/components/ui/Table';
import { useFontMetrics } from '../context';
import type { MetricRow } from './MetricTable.types';

export const MetricTable = () => {
  const { state } = useFontMetrics();

  const metricsData: MetricRow[] = [
    {
      metric: 'Font Family',
      rawValue: state.fontFamily ?? '-',
      normalizedValue: '-',
      comment: 'The name of the typeface family',
    },
    {
      metric: 'Subfamily',
      rawValue: state.subFamily ?? '-',
      normalizedValue: '-',
      comment: 'The specific weight or style',
    },
    {
      metric: 'Category',
      rawValue: state.category ?? '-',
      normalizedValue: '-',
      comment: 'The grid resolution of the font file',
    },
    {
      metric: 'Units per Em',
      rawValue: state.unitsPerEm ?? '-',
      normalizedValue: '1em',
      comment: 'The grid resolution of the font file',
    },
    {
      metric: 'Cap Height',
      rawValue: state.capHeight ?? '-',
      normalizedValue: String(state.capHeightRatio + 'em'),
      comment: 'Height of a capital letter (flat top)',
    },
    {
      metric: 'x-Height',
      rawValue: state.xHeight ?? '-',
      normalizedValue: String(state.xHeightRatio + 'em'),
      comment: 'Height of lowercase letters (like x)',
    },
    {
      metric: 'Avg. Char. Width',
      rawValue: state.avgCharWidth ?? '-',
      normalizedValue: String(state.avgCharWidthRatio + 'em'),
      comment: 'The average width of font glyphs',
    },
    {
      metric: 'Ascender',
      rawValue: state.hheaAscender ?? '-',
      normalizedValue: String(state.hheaAscenderRatio + 'em'),
      comment: `The highest point of the font's layout box`,
    },
    {
      metric: 'Descender',
      rawValue: state.hheaDescender ?? '-',
      normalizedValue: String(state.hheaDescenderRatio + 'em'),
      comment: 'The lowest point of the layout box',
    },
  ];

  const columns: ColumnConfig<MetricRow>[] = [
    { key: 'metric', label: 'Metric', copyable: false },
    { key: 'rawValue', label: 'Raw', copyable: true },
    { key: 'normalizedValue', label: 'CSS', copyable: true },
    { key: 'comment', label: 'Comment', copyable: false, hideAt: '63.99rem' },
  ];

  return (
    <Table
      data={metricsData}
      columns={columns}
      copyableByDefault={true}
      hideColumnsAt="63.99rem"
    />
  );
};
