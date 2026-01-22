import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DropZone } from './DropZone';

// Analyze teh component
/**
 * The components responsibility:
 * * Show a drop zone for file upload
 * * handle drag & drop functionality
 * * show different visual states (debugging, dragging, processing)
 * * show what format that is accepted
 * * show a hidden file input that should be activated via click
 *
 * The component is not responsible for:
 * * validation (useDropZone does that)
 * * parsing (inFileSelect callback does that)
 * * state management fpr isDragging (useDropZone does that)
 */

let capturedOnError: ((error: string) => void) | undefined;

vi.mock('@/hooks/useDropZone', () => ({
  useDropZone: vi.fn((props) => {
    capturedOnError = props.onError;

    return {
      isDragging: false,
      handleDragOver: vi.fn(),
      handleDragLeave: vi.fn(),
      handleDrop: vi.fn(),
      handleFileChange: vi.fn(),
    };
  }),
}));

describe('DropZone', () => {
  it('should render the main heading', () => {
    render(<DropZone inputId="test" onFileSelect={() => {}} />);

    const heading = screen.getByText('Drag your font file here');
    expect(heading).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    render(<DropZone inputId="test" onFileSelect={() => {}} />);

    const subtitle = screen.getByText('Or click to browse');
    expect(subtitle).toBeInTheDocument();
  });

  it('should render the supported formats text', () => {
    render(
      <DropZone
        inputId="test"
        onFileSelect={() => {}}
        accept="ttf, otf, woff, woff2"
      />
    );

    const supportedFormats = screen.getByText(
      'Supported formats: ttf, otf, woff, woff2'
    );
    expect(supportedFormats).toBeInTheDocument();
  });

  it('should show loader', () => {
    render(<DropZone inputId="test" onFileSelect={() => {}} isProcessing />);

    const processingText = screen.getByText('Processing...');
    expect(processingText).toBeInTheDocument();
  });

  it('should NOT show loader when not processing', () => {
    render(<DropZone inputId="test" onFileSelect={() => {}} />);

    const processingText = screen.queryByText('Processing...');
    expect(processingText).not.toBeInTheDocument();
  });

  it('should display error message when validation fails', async () => {
    render(<DropZone inputId="test" onFileSelect={() => {}} />);

    capturedOnError?.('Invalid file type. Accepted formats: .ttf, .otf');

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Invalid file type');
    });
  });
});
