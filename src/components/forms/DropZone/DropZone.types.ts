/**
 * Props for the DropZone component
 */
export interface DropZoneProps {
  /**
   * Unique ID for the file input element
   * Used to connect label with input via htmlFor
   * @example "font-upload"
   */
  inputId: string;

  /**
   * Callback fired when a valid file is selected
   * @param file - The selected font file
   * @example (file) => parseFontFile(file)
   */
  onFileSelect: (file: File) => void;

  /**
   * Optional callback fired when file validation fails
   * @param error - Error message describing the validation failure
   * @example (error) => toast.error(error)
   */
  onError?: (error: string) => void;

  /**
   * Comma-separated list of accepted file extensions
   * @default '.ttf,.otf,.woff,.woff2'
   * @example ".ttf,.otf"
   */
  accept?: string;

  /**
   * Maximum file size in bytes
   * @default 10485760 (10MB)
   * @example 5 * 1024 * 1024 // 5MB
   */
  maxSize?: number;

  /**
   * Whether the component is currently processing a file
   * When true, the drop zone is disabled and shows loading state
   * @default false
   */
  isProcessing?: boolean;
}

/**
 * Internal state of the DropZone component
 */
export type DropZoneState = 'default' | 'hover' | 'processing' | 'error';
