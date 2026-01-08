import styles from './MetricsTable.module.scss';

import { Table, type ColumnConfig } from '@/components/ui/Table';
import type { MetricRow } from './MetricTable.types';
import { useFontMetrics } from '@/pages/tools/PrecisionTypographyToolkit/context';
import { Icon } from '@/components/ui/Icon';
import { InfoIcon } from '@/assets/icons';
import { Flex } from '@/components/layout/Flex';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';

export const MetricTable = () => {
  const { state, setSelectedMetric } = useFontMetrics();
  const isBreakpoint = useMediaQuery(queries.isUpToTabletLarge);

  const tableToVisualizerMap: Record<string, string | null> = {
    fontFamily: null,
    subFamily: null,
    category: null,
    emBox: 'emBox',
    lineBox: 'lineBox',
    avgCharWidth: null,
    capHeight: 'capHeight',
    xHeight: 'xHeight',
    ascender: 'ascender',
    descender: 'descender',
    topTrim: 'topTrim',
    bottomTrim: 'bottomTrim',
  };

  const handleOpenDialog = (row: MetricRow) => {
    alert(`Row or info button "${row.metric}" clicked. Dialog with more info will appear (Work in progress)`);
  };

  const handleRowClick = (row: MetricRow, _index: number) => {
    const visualizerKey = tableToVisualizerMap[row.id];

    if (!visualizerKey) {
      setSelectedMetric(null);
      if (isBreakpoint) {
        handleOpenDialog(row);
      }
      return;
    }

    const isCurrentlySelected = state.selectedMetric === visualizerKey;
    const nextMetric = isCurrentlySelected ? null : visualizerKey;

    setSelectedMetric(nextMetric);

    // På mobil, öppna dialog om raden inte redan var selected
    if (isBreakpoint && !isCurrentlySelected) {
      handleOpenDialog(row);
    }
  };

  const metricsData: MetricRow[] = [
    {
      id: 'fontFamily',
      metric: 'Font Family',
      rawValue: state.fontFamily ?? '-',
      normalizedValue: '-',
      comment: 'The name of the typeface family',
    },
    {
      id: 'subFamily',
      metric: 'Subfamily',
      rawValue: state.subFamily ?? '-',
      normalizedValue: '-',
      comment: 'The specific weight or style',
    },
    {
      id: 'category',
      metric: 'Category',
      rawValue: state.category ?? '-',
      normalizedValue: '-',
      comment: 'The specific stylistic group the font belongs to',
    },
    {
      id: 'lineBox',
      metric: 'Line Height',
      rawValue: state.lineHeightMultiplier
        ? state.lineHeightMultiplier * (state.unitsPerEm || 1)
        : '-',
      normalizedValue: state.lineHeightMultiplier ?? '-',
      comment: 'The grid resolution of the font file',
    },
    {
      id: 'emBox',
      metric: 'Units per Em',
      rawValue: state.unitsPerEm ?? '-',
      normalizedValue: state.unitsPerEm ? '1em' : '-',
      comment: 'The grid resolution of the font file',
    },
    {
      id: 'avgCharWidth',
      metric: 'Avg. Char. Width',
      rawValue: state.avgCharWidth ?? '-',
      normalizedValue: state.avgCharWidth
        ? String(state.avgCharWidthRatio + 'em')
        : '-',
      comment: 'The average width of font glyphs',
    },
    {
      id: 'capHeight',
      metric: 'Cap Height',
      rawValue: state.capHeight ?? '-',
      normalizedValue: state.capHeight
        ? String(state.capHeightRatio + 'em')
        : '-',
      comment: 'Height of a capital letter (flat top)',
    },
    {
      id: 'xHeight',
      metric: 'x-Height',
      rawValue: state.xHeight ?? '-',
      normalizedValue: state.xHeight ? String(state.xHeightRatio + 'em') : '-',
      comment: 'Height of lowercase letters (like x)',
    },
    {
      id: 'ascender',
      metric: 'Ascender (hhea)',
      rawValue: state.hheaAscender ?? '-',
      normalizedValue: state.hheaAscender
        ? String(state.hheaAscenderRatio + 'em')
        : '-',
      comment: `The highest point of the font's layout box`,
    },
    {
      id: 'descender',
      metric: 'Descender (hhea)',
      rawValue: state.hheaDescender ?? '-',
      normalizedValue: state.hheaDescender
        ? String(state.hheaDescenderRatio + 'em')
        : '-',
      comment: 'The lowest point of the layout box',
    },
    {
      id: 'topTrim',
      metric: 'Top Trim',
      rawValue: state.topTrimRaw
        ? `${state.topTrimRaw} + ${state.halfLeading}*`
        : '-',
      normalizedValue: state.topTrimRatio
        ? String(state.topTrimRatio + 'em')
        : '-',
      comment: 'The trim space between cap-height and top of line-box',
    },
    {
      id: 'bottomTrim',
      metric: 'Bottom Trim',
      rawValue: state.bottomTrimRaw
        ? `${state.bottomTrimRaw} + ${state.halfLeading}*`
        : '-',
      normalizedValue: state.bottomTrimRatio
        ? String(state.bottomTrimRatio + 'em')
        : '-',
      comment: 'The trim space between baseline and bottom of line-box',
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
      render: (value, row) => (
        <Flex
          as="div"
          justifyContent="space-between"
          alignItems="center"
          gap="xs"
          width="full"
          className={styles['metrics-table__comment-cell']}
        >
          <span className={styles['metrics-table__comment-text']}>
            {String(value)}
          </span>
          <button
            className={styles['metrics-table__info-button']}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDialog(row);
            }}
            aria-label={`More info about ${row.metric}`}
          >
            <Icon icon={InfoIcon} fill="primary" />
          </button>
        </Flex>
      ),
    },
  ];

  return (
    <Table
      data={metricsData}
      columns={columns}
      copyableByDefault={true}
      hideColumnsAt="isUpToTabletLarge"
      className={styles['metrics-table']}
      onRowClick={handleRowClick}
      activeRowId={state.selectedMetric}
      rowIdKey="id"
    />
  );
};
