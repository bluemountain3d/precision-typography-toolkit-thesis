import { ThumbSlider } from '@/components/forms/ThumbSlider';
import { Toggle } from '@/components/forms/Toggle';
import { Flex } from '@/components/layout/Flex';
import { Heading } from '@/components/typography/Heading';
import { useState } from 'react';

export const MetricVisualizerBlock = () => {
  const [toggles, setToggles] = useState({
    kerning: false,
  });
  const [thumbSliders, setThumbSliders] = useState({
    lineHeight: 1.2,
  });

  const handleToggleChange = (key: string) => (checked: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: checked }));
  };

  const handleThumbSliderChange = (key: string) => (value: number) => {
    setThumbSliders((prev) => ({ ...prev, [key]: value }));
  };

  const labelWidth = 18;

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
          label={`font-kerning: ${toggles.kerning ? 'normal' : 'none'};`}
          labelWidth={labelWidth}
          labelPosition="before"
        />
        <ThumbSlider
          inputId="line-height"
          min={1}
          max={2}
          step={0.05}
          value={thumbSliders.lineHeight}
          onChange={handleThumbSliderChange('lineHeight')}
          label={`line-height: ${thumbSliders.lineHeight.toFixed(2)};`}
          labelWidth={labelWidth}
        />
      </Flex>
      {/* Visualizer */}
    </Flex>
  );
};
