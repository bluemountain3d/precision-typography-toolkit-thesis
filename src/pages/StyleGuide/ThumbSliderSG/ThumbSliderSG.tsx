import { Container } from '@/components/layout/Container';
import { Flex } from '@/layouts/Flex';
import { useState } from 'react';
import { ThumbSlider } from '@/components/forms/ThumbSlider';
import { ButtonGroup } from '@/components/layout/ButtonGroup';

export const ThumbSliderSG = () => {
  const [thumbSliders, setThumbSliders] = useState({
    lineHeight: 1.2,
    disabled: 1.2,
  });

  const handleThumbSliderChange = (key: string) => (value: number) => {
    setThumbSliders((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Container variant="boxed">
      <Flex direction="column" gap="xl">
        <h2 className="heading-2">ThumbSlider:</h2>
        <h3 className="heading-4">Active</h3>
        <ButtonGroup align="left" marginBottom="md">
          <ThumbSlider
            inputId="line-height"
            min={1}
            max={2}
            step={0.01}
            value={thumbSliders.lineHeight}
            onChange={handleThumbSliderChange('lineHeight')}
            label={`line-height: ${thumbSliders.lineHeight.toFixed(2)};`}
          />
        </ButtonGroup>
        <h3 className="heading-4">Disabled</h3>
        <ButtonGroup align="left" marginBottom="md">
          <ThumbSlider
            inputId="line-height-disabled"
            min={1}
            max={2}
            step={0.05}
            value={thumbSliders.disabled}
            onChange={handleThumbSliderChange('disabled')}
            disabled
            label={`line-height: ${thumbSliders.disabled.toFixed(2)};`}
          />
        </ButtonGroup>
      </Flex>
    </Container>
  );
};
