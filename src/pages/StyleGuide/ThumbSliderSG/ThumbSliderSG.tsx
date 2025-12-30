import { Container } from '@/components/layout/Container';
import { Flex } from '@/layouts/Flex';
import { useState } from 'react';
import { ThumbSlider } from '@/components/forms/ThumbSlider';
import { ButtonGroup } from '@/components/layout/ButtonGroup';
import { Heading } from '@/components/typography/Heading';

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
      <Flex direction="column" gap="lg">
        <Heading level={2} size="heading-2" marginBottom="lg">
          ThumbSlider:
        </Heading>
        <Heading level={3} size="heading-4" weight="semibold">
          Active
        </Heading>
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
        <Heading level={3} size="heading-4" weight="semibold">
          Disabled
        </Heading>
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
