import { Backdrop } from '@/components/ui/Backdrop';
import styles from './MetricDialog.module.scss';
import classNames from 'clsx';
import { Flex } from '@/components/layout/Flex';
import { useEffect } from 'react';
import { useFontMetrics } from '../../context';

import { CloseIcon, InfoSimpleIcon } from '@/assets/icons';
import { Icon } from '@/components/ui/Icon';
import { TextBox } from '@/components/typography/TextBox';
import { Button } from '@/components/forms/Button';
import { RemoveScroll } from 'react-remove-scroll';
import { FocusTrap } from 'focus-trap-react';
import { Text } from '@/components/typography/Text';
import { Heading } from '@/components/typography/Heading';
import { metricDialogData } from '@/utils';
import { useCopyMetric } from '@/hooks';

interface MetricDialogProps {
  metric: string;
  onCancel: () => void;
}

export const MetricDialog = ({ metric, onCancel }: MetricDialogProps) => {
  const { state } = useFontMetrics();
  const { copyMetric, isCopied } = useCopyMetric({ state, timeout: 1500 });

  const metricData = metricDialogData[metric];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  return (
    <Backdrop onClick={onCancel}>
      <RemoveScroll enabled removeScrollBar={false}>
        <FocusTrap
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            returnFocusOnDeactivate: true,
            escapeDeactivates: false,
            clickOutsideDeactivates: false,
          }}
        >
          <div
            className={classNames(styles['metric-dialog__wrapper'])}
            onClick={(e) => e.stopPropagation()}
          >
            <Flex
              as="dialog"
              direction="column"
              gap="lg"
              className={classNames(styles['metric-dialog'])}
              aria-modal="true"
              aria-labelledby="metric-dialog-title"
            >
              <Icon
                icon={InfoSimpleIcon}
                size="heading-3"
                fill="secondary"
                className={styles['metric-dialog__info-icon']}
              />
              <Button
                iconOnly
                variant="ghost"
                size="sm"
                onClick={onCancel}
                icon={CloseIcon}
                aria-label={`Close "${metric}" metric dialog`}
                className={styles['metric-dialog__close']}
              />
              <TextBox
                widthSize="base"
                maxWidth="70ch"
                id="metric-dialog-content"
                className="color-text-primary"
              >
                <Heading
                  level={2}
                  size="heading-3"
                  variant="primary"
                  id="metric-dialog-title"
                >
                  {metricData.title}
                </Heading>
                <Text
                  marginTop="sm"
                  marginBottom="lg"
                  variant="secondary"
                  weight="medium"
                >
                  {metricData.leadIn}
                </Text>
                <table>
                  <tbody>
                    <tr>
                      <th scope="row">RAW:</th>
                      <td>{metricData.getRaw(state)}</td>
                    </tr>
                    <tr>
                      <th scope="row">CSS:</th>
                      <td>{metricData.getCss(state)}</td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <Text variant="primary" size="sm">
                  {metricData.info}
                </Text>
              </TextBox>
              <div className={styles['metric-dialog__button-group']}>
                <Button
                  variant="primary"
                  fullWidth
                  aria-label="Copy metric RAW value"
                  onClick={() => copyMetric(metric, 'raw')}
                >
                  {isCopied(metric, 'raw') ? 'Copied!' : 'Copy RAW value'}
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  aria-label="Copy metric CSS value"
                  onClick={() => copyMetric(metric, 'css')}
                >
                  {isCopied(metric, 'css') ? 'Copied!' : 'Copy CSS value'}
                </Button>
              </div>
            </Flex>
          </div>
        </FocusTrap>
      </RemoveScroll>
    </Backdrop>
  );
};
