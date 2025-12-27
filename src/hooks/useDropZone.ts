import { useState } from 'react';

/**
 * Props for the useDropZone hook
 */
interface UseDropZoneProps {
  /**
   * Callback fired when a valid file is selected
   */
  onFileSelect: (file: File) => void;

  /**
   * Optional callback fired when validation fails
   */
  onError?: (error: string) => void;

  /**
   * Comma-separated list of accepted file extensions
   */
  accept: string;

  /**
   * Maximum file size in bytes
   */
  maxSize: number;
}

/**
 * Return value from useDropZone hook
 */
interface UseDropZoneReturn {
  /**
   * Whether a file is currently being dragged over the drop zone
   */
  isDragging: boolean;

  /**
   * Handler for dragover event
   * Prevents default behavior and sets dragging state
   */
  handleDragOver: (e: React.DragEvent) => void;

  /**
   * Handler for dragleave event
   * Resets dragging state when drag leaves the zone
   */
  handleDragLeave: (e: React.DragEvent) => void;

  /**
   * Handler for drop event
   * Validates and processes dropped files
   */
  handleDrop: (e: React.DragEvent) => void;

  /**
   * Handler for file input change event
   * Validates and processes selected files
   */
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Custom hook for drag-and-drop file upload functionality
 *
 * Handles:
 * - Drag and drop events
 * - File validation (type and size)
 * - File input change events
 * - Dragging state management
 *
 * @param props - Configuration options for the drop zone
 * @returns Event handlers and state for drop zone functionality
 *
 * @example
 * ```tsx
 * const {
 *   isDragging,
 *   handleDragOver,
 *   handleDragLeave,
 *   handleDrop,
 *   handleFileChange,
 * } = useDropZone({
 *   onFileSelect: (file) => console.log('Selected:', file.name),
 *   onError: (error) => console.error(error),
 *   accept: '.ttf,.otf,.woff,.woff2',
 *   maxSize: 10 * 1024 * 1024, // 10MB
 * });
 * ```
 */
export const useDropZone = ({
  onFileSelect,
  onError,
  accept,
  maxSize,
}: UseDropZoneProps): UseDropZoneReturn => {
  const [isDragging, setIsDragging] = useState(false);

  /**
   * Validates a file against accept and maxSize constraints
   *
   * @param file - File to validate
   * @returns Error message if validation fails, null if valid
   */
  const validateFile = (file: File): string | null => {
    // Check file type
    const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!acceptedTypes.includes(fileExtension)) {
      return `Invalid file type. Accepted formats: ${accept}`;
    }

    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
      return `File too large. Maximum size: ${maxSizeMB}MB`;
    }

    return null;
  };

  /**
   * Validates and processes a file
   * Calls onError if validation fails, onFileSelect if successful
   *
   * @param file - File to process
   */
  const handleFile = (file: File) => {
    const error = validateFile(file);
    if (error) {
      onError?.(error);
      return;
    }
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  };
};
