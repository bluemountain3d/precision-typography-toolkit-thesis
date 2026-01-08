import type React from 'react';
import styles from './ConfirmDialog.module.scss';
import classNames from 'clsx';
import { Flex } from '@/components/layout/Flex';
import { Heading } from '@/components/typography/Heading';
import { ButtonGroup } from '@/components/layout/ButtonGroup';
import { Button } from '@/components/forms/Button';
import { Icon } from '../Icon';
import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from '@/assets/icons';
import { Text } from '@/components/typography/Text';
import { useEffect } from 'react';

interface ConfirmDialogProps {
  title: string;
  message: React.ReactNode;
  confirmText: string;
  confirmVariant: 'success' | 'warning' | 'danger' | 'info';
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  title,
  message,
  confirmText,
  confirmVariant,
  cancelText = 'cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const stringMessage = typeof message === 'string';

  const iconVariants = {
    success: SuccessIcon,
    warning: WarningIcon,
    danger: DangerIcon,
    info: InfoIcon,
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="xl"
        className={classNames(styles['confirm-dialog'])}
        onClick={(e) => e.stopPropagation()}
      >
        <Flex justifyContent="center" alignItems="center" gap="md">
          <Icon
            icon={iconVariants[confirmVariant]}
            fill={confirmVariant}
            size="heading-3"
          />
          <Heading level={2} size="heading-3">
            {title}
          </Heading>
        </Flex>
        {stringMessage ? <Text>{message}</Text> : message}
        <ButtonGroup marginTop="xs">
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button variant={'secondary'} onClick={onCancel}>
            {cancelText}
          </Button>
        </ButtonGroup>
      </Flex>
    </div>
  );
};
