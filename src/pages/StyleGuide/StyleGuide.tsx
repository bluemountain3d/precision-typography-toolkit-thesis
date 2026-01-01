import { Container } from '@/components/layout/Container';
import { FontMetricsProvider } from '../tools/PrecisionTypographyToolkit/context';
import { DropZoneSG } from './DropZoneSG';
import { Flex } from '@/layouts/Flex';
import { MetricsTableSG } from './MetricsTableSG';
import { ButtonsSG } from './ButtonsSG';
import { ToggleSG } from './ToggleSG';
import { ThumbSliderSG } from './ThumbSliderSG';
import { CollapsibleSG } from './CollapsibleSG';
import { Heading } from '@/components/typography/Heading';
import { ImgSG } from './ImageSG';

export const StyleGuide = () => {
  return (
    <FontMetricsProvider>
      <Container variant="full" noGap marginTop="4xl" marginBottom="4xl">
        <Container variant="boxed">
          <Heading level={1} size="heading-1" marginBottom="4xl">
            Style Guide
          </Heading>
        </Container>
        <Flex direction="column" gap="5xl">
          <DropZoneSG />
          <MetricsTableSG />
          <ButtonsSG />
          <ToggleSG />
          <ThumbSliderSG />
          <CollapsibleSG />
          <ImgSG />
        </Flex>
      </Container>
    </FontMetricsProvider>
  );
};
