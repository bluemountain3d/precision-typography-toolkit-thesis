import { Container } from '@components/layout/Container';
import { FontMetricsProvider, useFontMetrics } from './context';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { Flex } from '@/components/layout/Flex';
// import { MetricVisualizerBlock } from './MetricVisualizerBlock';
import { MetricTableBlock } from './MetricTableBlock';
import { HeroBlock } from './HeroBlock/HeroBlock';
import { PageSection } from '@/components/layout/PageSection';

/**
 * Inner component that uses the FontMetrics context
 */
const PrecisionTypographyToolkitContent = () => {
  const { state } = useFontMetrics();
  const isUnderBreakpoint = useMediaQuery(queries.isTabletLargeAndDown);

  return (
    <>
      {/* Hero Section */}
      <PageSection id="hero-section" fullHeight centerContent>
        <Container variant="boxed">
          <HeroBlock />
        </Container>
      </PageSection>

      {/* Metrics Visualizer */}
      {state.fontFile && (
        <>
          <PageSection id="metrics-visualizer" padding="large">
            <Container variant={isUnderBreakpoint ? 'boxed' : 'narrow'}>
              <Flex width="full" direction="column" gap="2xl">
                {/* <MetricVisualizerBlock /> */}
                <p className="text-align-center">
                  !! Metrics Visualizer will be placed here !!
                </p>
                <MetricTableBlock />
              </Flex>
            </Container>
          </PageSection>

          {/* Export Metrics */}
          <PageSection id="export-metrics" padding="large">
            <p className="text-align-center">
              !! Export metrics as different languages will be here !!
            </p>
          </PageSection>
        </>
      )}

      {/* Metrics learn intro */}
      <PageSection id="metrics-intro" padding="large">
        <p className="text-align-center">
          !! Intro to font metrics with a link to the "learn" article !!
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
