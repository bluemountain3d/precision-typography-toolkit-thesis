import { useState } from 'react';
import { DropZone } from '@components/forms/DropZone';
import { Container } from '@components/layout/Container';
import { parseFontFile } from '@utils/fontParser';
import type { FontMetrics } from '@models';

export const DropZoneSG = () => {
  const [metrics, setMetrics] = useState<FontMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFontUpload = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const fontMetrics = await parseFontFile(file);
      setMetrics(fontMetrics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse font');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <Container variant="boxed">
      <h1 className="heading-1">DropZone Test</h1>

      <DropZone
        inputId="font-drop"
        onFileSelect={handleFontUpload}
        onError={handleError}
        isProcessing={isProcessing}
      />

      {isProcessing && <p>Processing font file...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {metrics && <pre>{JSON.stringify(metrics, null, 2)}</pre>}
    </Container>
  );
};
