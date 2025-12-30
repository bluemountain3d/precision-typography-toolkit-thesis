import { DropZone } from '@/components/forms/DropZone';
import { Container } from '@/components/layout/Container';
import { Flex } from '@/layouts/Flex';
import {
  useFontMetrics,
  prepareFontMetricsState,
} from '@/pages/tools/PrecisionTypographyToolkit/context';
import { parseFontFile } from '@/utils';

export const DropZoneSG = () => {
  const { state, dispatch } = useFontMetrics();

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

  return (
    <Container variant="boxed">
      <Flex direction="column" gap="2xl">
        <h2 className="heading-2">DropZone:</h2>
        <DropZone
          inputId="font-drop"
          onFileSelect={handleFileSelect}
          isProcessing={state.isLoading}
        />
      </Flex>
    </Container>
  );
};
