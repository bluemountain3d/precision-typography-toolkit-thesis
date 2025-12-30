import { Container } from '@/components/layout/Container';
import { useMediaQuery } from '@/hooks';
import { Flex } from '@/layouts/Flex';
import { MetricTable } from '@/pages/tools/PrecisionTypographyToolkit/MetricTable';
import { queries } from '@/types';

export const MetricsTableSG = () => {
  const isUnderBreakpoint = useMediaQuery(queries.isUpToTabletLarge);

  return (
    <Flex direction="column" gap="lg">
      <Container variant="boxed">
        <h2 className="heading-2">MetricsTable:</h2>
      </Container>

      <Container variant={isUnderBreakpoint ? 'boxed' : 'narrow'}>
        <MetricTable />
      </Container>
    </Flex>
  );
};
