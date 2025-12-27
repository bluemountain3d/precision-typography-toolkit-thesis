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
import { Button } from '@/components/forms/Button';
import { SassIcon } from '@/assets/icons';
import { SuccessIcon } from '@/assets/icons';
import { WarningIcon } from '@/assets/icons';
import { DangerIcon } from '@/assets/icons';
import { InfoIcon } from '@/assets/icons';
import { ButtonGroup } from '@/components/layout/ButtonGroup';
import { Toggle } from '@/components/forms/Toggle';
import { useState } from 'react';

/**
 * Inner component that uses the FontMetrics context
 */
const PrecisionTypographyToolkitContent = () => {
  const { state, dispatch } = useFontMetrics();

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

  // DEV
  const [toggles, setToggles] = useState({
    feature1: false,
    feature2: false,
  });

  const handleToggleChange = (key: string) => (checked: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: checked }));
  };

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

      <Container variant="boxed" marginTop="xl">
        <ButtonGroup>
          <Button variant="primary" icon={SassIcon}>
            Primary
          </Button>
          <Button variant="secondary" icon={SassIcon}>
            Secondary
          </Button>
          <Button variant="accent" icon={SassIcon}>
            Accent
          </Button>
          <Button variant="ghost" icon={SassIcon}>
            Ghost
          </Button>
          <Button variant="link">Link</Button>
          <Button variant="success" icon={SuccessIcon}>
            Success
          </Button>
          <Button variant="warning" icon={WarningIcon}>
            Warning
          </Button>
          <Button variant="danger" icon={DangerIcon}>
            Danger
          </Button>
          <Button variant="info" icon={InfoIcon}>
            Info
          </Button>
          <Button variant="disabled" icon={SassIcon}>
            Disabled
          </Button>
        </ButtonGroup>
      </Container>

      <Container variant="boxed" marginTop="xl">
        <ButtonGroup>
          <Toggle
            toggleId="toggle-1"
            onChange={handleToggleChange('feature1')}
            checked={toggles.feature1}
          />
          <Toggle
            toggleId="toggle-2"
            onChange={handleToggleChange('feature2')}
            checked={toggles.feature2}
            disabled
          />
        </ButtonGroup>
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
