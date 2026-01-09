import type React from 'react';
import styles from './CopyButton.module.scss';
import classNames from 'clsx';
import { CopyIcon } from '@assets/icons';
import { SuccessIcon } from '@assets/icons';
import { Icon } from '@components/ui/Icon';
import { useState } from 'react';

/**
 * CopyButton component props
 */
interface CopyButtonProps {
  /** Text value to copy to clipboard */
  value: string;
  onCopy?: () => void;
}

/**
 * Button that copies text to clipboard with visual feedback.
 * Shows success icon for 500ms after copying.
 * Prevents click event from bubbling to parent elements (e.g., table rows).
 *
 * @example
 * <CopyButton value="Text to copy" />
 */
export const CopyButton = ({ value, onCopy }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  // const handleCopy = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   navigator.clipboard.writeText(String(value));

  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 500);
  // };

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (onCopy) {
      onCopy();
    } else if (value) {
      navigator.clipboard.writeText(String(value));
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      className={classNames(styles['copy-button'])}
      onClick={handleAction}
      aria-label="Copy to clipboard"
    >
      <Icon
        icon={copied ? SuccessIcon : CopyIcon}
        fill={copied ? 'success' : 'primary'}
      />
    </button>
  );
};
