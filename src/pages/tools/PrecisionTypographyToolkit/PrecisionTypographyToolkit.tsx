import { Container } from '@components/layout/Container';
import { FontMetricsProvider, useFontMetrics } from './context';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { Flex } from '@/components/layout/Flex';
// import { MetricVisualizerBlock } from './MetricVisualizerBlock';
import { MetricTableBlock } from './MetricTableBlock';
import { HeroBlock } from './HeroBlock/HeroBlock';

/**
 * Inner component that uses the FontMetrics context
 */
const PrecisionTypographyToolkitContent = () => {
  const { state } = useFontMetrics();
  const isUnderBreakpoint = useMediaQuery(queries.isTabletLargeAndDown);

  return (
    <Flex width="full" direction="column" gap="6xl">
      {/* Hero Section */}
      <section id="hero-section">
        <Container variant="boxed">
          <HeroBlock />
        </Container>
      </section>

      {/* Metrics Visualizer */}
      {state.fontFile && (
        <>
          <section id="metrics-visualizer">
            <Container variant={isUnderBreakpoint ? 'boxed' : 'narrow'}>
              <Flex width="full" direction="column" gap="2xl">
                {/* <MetricVisualizerBlock /> */}
                <p className="text-align-center">
                  !! Metrics Visualizer will be placed here !!
                </p>
                <MetricTableBlock />
              </Flex>
            </Container>
          </section>

          {/* Export Metrics */}
          <section id="export-metrics">
            <p className="text-align-center">
              !! Export metrics as different languages will be here !!
            </p>
          </section>
        </>
      )}

      {/* Metrics learn intro */}
      <section id="metrics-intro">
        <p className="text-align-center">
          !! Intro to font metrics with a link to the "learn" article !!
        </p>
      </section>
    </Flex>
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
