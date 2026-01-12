import { Container } from '@components/layout/Container';
import { FontMetricsProvider, useFontMetrics } from './context';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { Flex } from '@/components/layout/Flex';
import { MetricTableBlock } from './MetricTableBlock';
import { HeroBlock } from './HeroBlock/HeroBlock';
import { PageSection } from '@/components/layout/PageSection';
import { MetricVisualizerBlock } from './MetricVisualizerBlock';
import { ExportMetricsBlock } from './ExportMetricsBlock/ExportMetricsBlock';

/**
 * Inner component that uses the FontMetrics context
 */
const PrecisionTypographyToolkitContent = () => {
  const { setSelectedMetric } = useFontMetrics();
  const isUnderBreakpoint = useMediaQuery(queries.isTabletLargeAndDown);
  const isMobile = useMediaQuery(queries.isUpToTablet);

  return (
    <>
      {/* Hero Section */}
      <PageSection id="hero-section" fullHeight centerContent>
        <Container variant="boxed">
          <HeroBlock />
        </Container>
      </PageSection>

      {/* Metrics Visualizer */}
      <>
        <PageSection
          id="metrics-visualizer"
          padding="large"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedMetric('');
            }
          }}
          style={{ scrollMarginTop: 'var(--header-height-scrolled)' }}
        >
          <Container
            variant={isUnderBreakpoint ? 'boxed' : 'narrow'}
            noGap={!isUnderBreakpoint}
          >
            <Flex width="full" direction="column" gap={isMobile ? 'lg' : '4xl'}>
              <MetricVisualizerBlock />
              <MetricTableBlock />
            </Flex>
          </Container>
        </PageSection>

        {/* Export Metrics */}
        <PageSection id="export-metrics" padding="large">
          <Container
            variant={isUnderBreakpoint ? 'boxed' : 'narrow'}
            noGap={!isUnderBreakpoint}
          >
            <ExportMetricsBlock />
            {/* <p className="text-align-center">
              !! Work In Progress: Export metrics for different languages will
              be here !!
            </p> */}
          </Container>
        </PageSection>
      </>

      {/* Metrics learn intro */}
      <PageSection id="metrics-intro" padding="large">
        <p className="text-align-center">
          !! Work In Progress: Intro to font metrics with a link to the "learn"
          article !!
        </p>
      </PageSection>
    </>
  );
};

/**
 * Precision Typography Toolkit
 *
 * Main page component wrapped with FontMetricsProvider.
 * Handles font upload, metrics extraction, and visualization.
 */
export const PrecisionTypographyToolkit = () => {
  return (
    <FontMetricsProvider>
      <PrecisionTypographyToolkitContent />
    </FontMetricsProvider>
  );
};
