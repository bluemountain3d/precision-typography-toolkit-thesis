import { Table, type ColumnConfig } from '@/components/ui/Table';
import type { MetricRow } from './MetricTable.types';
import { useFontMetrics } from '@/pages/tools/PrecisionTypographyToolkit/context';

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
      normalizedValue: state.unitsPerEm ? '1em' : '-',
      comment: 'The grid resolution of the font file',
    },
    {
      metric: 'Cap Height',
      rawValue: state.capHeight ?? '-',
      normalizedValue: state.capHeight
        ? String(state.capHeightRatio + 'em')
        : '-',
      comment: 'Height of a capital letter (flat top)',
    },
    {
      metric: 'x-Height',
      rawValue: state.xHeight ?? '-',
      normalizedValue: state.xHeight ? String(state.xHeightRatio + 'em') : '-',
      comment: 'Height of lowercase letters (like x)',
    },
    {
      metric: 'Avg. Char. Width',
      rawValue: state.avgCharWidth ?? '-',
      normalizedValue: state.avgCharWidth
        ? String(state.avgCharWidthRatio + 'em')
        : '-',
      comment: 'The average width of font glyphs',
    },
    {
      metric: 'Ascender',
      rawValue: state.hheaAscender ?? '-',
      normalizedValue: state.hheaAscender
        ? String(state.hheaAscenderRatio + 'em')
        : '-',
      comment: `The highest point of the font's layout box`,
    },
    {
      metric: 'Descender',
      rawValue: state.hheaDescender ?? '-',
      normalizedValue: state.hheaDescender
        ? String(state.hheaDescenderRatio + 'em')
        : '-',
      comment: 'The lowest point of the layout box',
    },
  ];

  const columns: ColumnConfig<MetricRow>[] = [
    { key: 'metric', label: 'Metric', copyable: false },
    { key: 'rawValue', label: 'Raw', copyable: true },
    { key: 'normalizedValue', label: 'CSS', copyable: true },
    {
      key: 'comment',
      label: 'Comment',
      copyable: false,
      hideAt: 'isUpToTabletLarge',
    },
  ];

  return (
    <Table
      data={metricsData}
      columns={columns}
      copyableByDefault={true}
      hideColumnsAt="isUpToTabletLarge"
    />
  );
};
