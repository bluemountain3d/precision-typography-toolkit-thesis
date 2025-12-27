import type React from 'react';
import styles from './CopyButton.module.scss';
import classNames from 'clsx';
import { CopyIcon } from '@assets/icons';
import { SuccessIcon } from '@assets/icons';
import { Icon } from '@components/ui/Icon';
import { useState } from 'react';

interface CopyButtonProps {
  value: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(String(value));

    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };

  return (
    <button
      className={classNames(styles['copy-button'])}
      onClick={handleCopy}
      aria-label="Copy to clipboard"
    >
      <Icon
        icon={copied ? SuccessIcon : CopyIcon}
        fill={copied ? 'success' : 'primary'}
      />
    </button>
  );
};
