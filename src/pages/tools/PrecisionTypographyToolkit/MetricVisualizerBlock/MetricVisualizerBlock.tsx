import { ThumbSlider } from '@/components/forms/ThumbSlider';
import { Toggle } from '@/components/forms/Toggle';
import { Flex } from '@/components/layout/Flex';
import { Heading } from '@/components/typography/Heading';
import { useState } from 'react';
import { MetricsVisualizer } from './MetricsVisualizer';
import { ButtonGroup } from '@/components/layout/ButtonGroup';
import { useFontMetrics } from '../context';
import { Button } from '@/components/forms/Button';
import { MetricsNiceName, getMetricValue } from '@/utils';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';

export const MetricVisualizerBlock = () => {
  const { state, updateLineHeightTrims } = useFontMetrics();
  const [toggles, setToggles] = useState({
    kerning: true,
  });
  const [thumbSliders, setThumbSliders] = useState({
    lineHeight: 1.5,
  });

  const isTabletUp = useMediaQuery(queries.isTabletAndUp);

  const handleToggleChange = (key: string) => (checked: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: checked }));
  };

  const handleLineHeightChange = (key: string) => (value: number) => {
    setThumbSliders((prev) => ({ ...prev, [key]: value }));
    updateLineHeightTrims(value);
  };

  const labelWidth = 26;

  return (
    <Flex direction="column" width="full" gap="xl">
      <Heading level={2} size="heading-2" className="sr-only">
        Metrics Visualizer
      </Heading>
      <Flex direction="column" width="full" gap="lg">
        <Toggle
          toggleId="kerning-on-off"
          onChange={handleToggleChange('kerning')}
          checked={toggles.kerning}
          label={`font-feature-settings: ${toggles.kerning ? '"kern" 1' : '"kern" 0'};`}
          labelWidth={labelWidth}
          labelPosition="before"
        />
        <ThumbSlider
          inputId="line-height"
          min={1}
          max={2}
          step={0.05}
          value={thumbSliders.lineHeight}
          onChange={handleLineHeightChange('lineHeight')}
          label={`line-height: ${thumbSliders.lineHeight.toFixed(2)};`}
          labelWidth={labelWidth}
        />
      </Flex>
      <MetricsVisualizer
        lineHeight={thumbSliders.lineHeight}
        kerning={toggles.kerning}
      />
      {isTabletUp && (
        <ButtonGroup>
          <Button variant="label" radius="sm">
            {state.selectedMetric
              ? `.::${'\u00A0\u00A0\u00A0'}${MetricsNiceName[state.selectedMetric]}: ${getMetricValue(state.selectedMetric, state, thumbSliders.lineHeight)}${'\u00A0\u00A0\u00A0'}::.`
              : `.::${'\u00A0\u00A0\u00A0'}Select a metric to see its values${'\u00A0\u00A0\u00A0'}::.`}
          </Button>
        </ButtonGroup>
      )}
    </Flex>
  );
};
