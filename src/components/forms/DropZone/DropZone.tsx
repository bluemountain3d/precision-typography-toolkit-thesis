import { useState } from 'react';
import styles from './DropZone.module.scss';
import type { DropZoneProps } from './DropZone.types';
import { useDropZone } from '@hooks/useDropZone';
import classNames from 'clsx';
import { Button } from '../Button';
import { DangerIcon } from '@/assets/icons';

/**
 * DropZone component for drag-and-drop font file uploads
 *
 * Provides a user-friendly interface for uploading font files with:
 * - Drag and drop support
 * - Click to browse fallback
 * - File type and size validation
 * - Visual feedback for different states (default, dragging, processing)
 *
 * @example
 * Basic usage:
 * ```tsx
 * <DropZone
 *   inputId="font-upload"
 *   onFileSelect={handleFontFile}
 * />
 * ```
 *
 * @example
 * With error handling and custom validation:
 * ```tsx
 * <DropZone
 *   inputId="font-upload"
 *   onFileSelect={handleFontFile}
 *   onError={showErrorToast}
 *   accept=".ttf,.otf"
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   isProcessing={isLoading}
 * />
 * ```
 */
export const DropZone = ({
  inputId,
  onFileSelect,
  onError,
  accept = '.ttf, .otf, .woff, .woff2',
  maxSize = 10 * 1024 * 1024,
  isProcessing = false,
}: DropZoneProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleError = (error: string) => {
    setErrorMessage(error);
    onError?.(error);
    // Clear after 10 seconds
    setTimeout(() => setErrorMessage(null), 10 * 1000);
  };

  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  } = useDropZone({ onFileSelect, onError: handleError, accept, maxSize });

  return (
    <div
      className={classNames(
        styles['drop-zone'],
        isDragging && styles['drop-zone--dragging'],
        isProcessing && styles['drop-zone--processing']
      )}
    >
      {!errorMessage && (
        <>
          <label
            htmlFor={inputId}
            className={styles['drop-zone__label']}
            onDragOver={isProcessing ? undefined : handleDragOver}
            onDragLeave={isProcessing ? undefined : handleDragLeave}
            onDrop={isProcessing ? undefined : handleDrop}
            aria-disabled={isProcessing}
            aria-describedby={`${inputId}-formats`}
          >
            <p className={classNames(styles['drop-zone__title'], 'text-md')}>
              Drag your font file here
            </p>
            <span
              className={classNames(styles['drop-zone__subtitle'], 'text-md')}
            >
              Or click to browse
            </span>
            <span
              className={classNames(
                styles['drop-zone__accepted'],
                'code-inline-sm'
              )}
            >
              Supported formats: {accept}
            </span>
            {isProcessing && (
              <div
                className={classNames(styles['drop-zone__loader'])}
                role="status"
                aria-label="Processing font file, please wait"
              >
                <span className={classNames('loader-lg')}></span>
                <span>Processing...</span>
              </div>
            )}
          </label>
          <input
            id={inputId}
            type="file"
            accept={accept}
            className={classNames('sr-only')}
            onChange={handleFileChange}
            disabled={isProcessing}
          />
        </>
      )}

      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className={styles['drop-zone__error']}
        >
          {errorMessage}
          <Button
            variant="danger"
            size="md"
            icon={DangerIcon}
            onClick={() => setErrorMessage(null)}
            aria-label="Dismiss error message"
          >
            Dismiss
          </Button>
        </div>
      )}
    </div>
  );
};
