import { Container } from '@/components/layout/Container';
import { FontMetricsProvider } from '../tools/PrecisionTypographyToolkit/context';
import { DropZoneSG } from './DropZoneSG';
import { Flex } from '@/layouts/Flex';
import { MetricsTableSG } from './MetricsTableSG';
import { ButtonsSG } from './ButtonsSG';
import { ToggleSG } from './ToggleSG';
import { ThumbSliderSG } from './ThumbSliderSG';
import { CollapsibleSG } from './CollapsibleSG';

export const StyleGuide = () => {
  return (
    <FontMetricsProvider>
      <Container variant="full" noGap marginTop="4xl" marginBottom="4xl">
        <Container variant="boxed" marginBottom="4xl">
          <h1 className="heading-1">Style Guide</h1>
        </Container>
        <Flex direction="column" gap="3xl">
          <DropZoneSG />
          <MetricsTableSG />
          <ButtonsSG />
          <ToggleSG />
          <ThumbSliderSG />
          <CollapsibleSG />
        </Flex>
      </Container>
    </FontMetricsProvider>
  );
};
