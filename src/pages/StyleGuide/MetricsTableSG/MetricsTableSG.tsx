import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/typography/Heading';
import { useMediaQuery } from '@/hooks';
import { Flex } from '@/components/layout/Flex';
import { MetricTable } from '@/pages/tools/PrecisionTypographyToolkit/MetricTable';
import { queries } from '@/types';

export const MetricsTableSG = () => {
  const isUnderBreakpoint = useMediaQuery(queries.isUpToTabletLarge);

  return (
    <Flex direction="column" gap="2xl">
      <Container variant="boxed">
        <Heading level={2} size="heading-2">
          MetricsTable:
        </Heading>
      </Container>

      <Container variant={isUnderBreakpoint ? 'boxed' : 'narrow'}>
        <MetricTable />
      </Container>
    </Flex>
  );
};
