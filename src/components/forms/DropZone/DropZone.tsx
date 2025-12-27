import styles from './DropZone.module.scss';
import type { DropZoneProps } from './DropZone.types';
import { useDropZone } from '@hooks/useDropZone';
import classNames from 'clsx';

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
  accept = '.ttf,.otf,.woff,.woff2',
  maxSize = 10 * 1024 * 1024,
  isProcessing = false,
}: DropZoneProps) => {
  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  } = useDropZone({ onFileSelect, onError, accept, maxSize });

  return (
    <div
      className={classNames(
        styles['drop-zone'],
        isDragging && styles['drop-zone--dragging'],
        isProcessing && styles['drop-zone--processing']
      )}
    >
      <label
        htmlFor={inputId}
        className={styles['drop-zone__label']}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className={classNames(styles['drop-zone__title'], 'text-md')}>
          Drag your font file here
        </p>
        <span className={classNames(styles['drop-zone__subtitle'], 'text-md')}>
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
          <div className={classNames(styles['drop-zone__loader'])}>
            <span className={classNames('loader-lg')}></span>
          </div>
        )}
      </label>
      <input
        id={inputId}
        type="file"
        accept={accept}
        className={classNames('sr-only')}
        onChange={handleFileChange}
      />
    </div>
  );
};
