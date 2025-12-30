import { DropZone } from '@/components/forms/DropZone';
import { Container } from '@components/layout/Container';
import {
  FontMetricsProvider,
  useFontMetrics,
  prepareFontMetricsState,
} from './context';
import { parseFontFile } from '@/utils/fontParser';
import { MetricTable } from './MetricTable';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
// import { useState } from 'react';

/**
 * Inner component that uses the FontMetrics context
 */
const PrecisionTypographyToolkitContent = () => {
  const { state, dispatch } = useFontMetrics();
  // const [toggles, setToggles] = useState({
  //   kerning: false,
  // });
  // const [thumbSliders, setThumbSliders] = useState({
  //   lineHeight: 1.2,
  // });

  const isUnderBreakpoint = useMediaQuery(queries.isUpToTabletLarge);

  /**
   * Handle font file selection
   */
  const handleFileSelect = async (file: File) => {
    dispatch({ type: 'FONT_UPLOAD_START' });

    try {
      const metrics = await parseFontFile(file);
      const fontMetricsState = prepareFontMetricsState(file, metrics);
      dispatch({ type: 'FONT_UPLOAD_SUCCESS', payload: fontMetricsState });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to parse font file';
      dispatch({ type: 'FONT_UPLOAD_ERROR', payload: errorMessage });
    }
  };

  // const handleToggleChange = (key: string) => (checked: boolean) => {
  //   setToggles((prev) => ({ ...prev, [key]: checked }));
  // };

  // const handleThumbSliderChange = (key: string) => (value: number) => {
  //   setThumbSliders((prev) => ({ ...prev, [key]: value }));
  // };

  return (
    <>
      <Container variant="boxed">
        <h1>Precision Typography Toolkit</h1>

        <DropZone
          inputId="font-loader"
          onFileSelect={handleFileSelect}
          isProcessing={state.isLoading}
        />

        {/* {state.isLoading && <p>Loading font...</p>} */}

        {/* {state.error && (
        <div style={{ color: 'red' }}>
          <p>Error: {state.error}</p>
        </div>
      )} */}
      </Container>

      <Container
        variant={isUnderBreakpoint ? 'boxed' : 'narrow'}
        marginTop="xl"
      >
        <MetricTable />
      </Container>
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
