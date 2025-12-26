import type React from 'react';
import styles from './CopyButton.module.scss';
import classNames from 'clsx';
import { CopyIcon } from '@/assets/icons';
import { Icon } from '@components/ui/Icon';

interface CopyButtonProps {
  value: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(String(value));
  };

  return (
    <button
      className={classNames(styles['copy-button'])}
      onClick={handleCopy}
      aria-label="Copy to clipboard"
    >
      <Icon icon={CopyIcon} />
      {/* TODO: Add Icon */}
    </button>
  );
};
