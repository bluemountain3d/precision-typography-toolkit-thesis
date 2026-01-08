import { Button } from '@/components/forms/Button';
import { Flex } from '@/components/layout/Flex';
import { Heading } from '@/components/typography/Heading';
import { removeLocalStorage } from '@/utils/localStorage';
import { useFontMetrics } from '../context';
import { MetricTable } from './MetricTable';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { Footnote } from '@/components/typography/Footnote';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useState } from 'react';

export const MetricTableBlock = () => {
  const { state, dispatch } = useFontMetrics();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const isMobile = useMediaQuery(queries.isUpToTablet);

  const handleClearData = () => {
    dispatch({ type: 'RESET_FONT' });
    removeLocalStorage('fontMetrics');
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Flex width="full" direction="column" gap="sm">
        {!isMobile && (
          <Flex justifyContent="start" alignItems="center">
            <Heading level={2} size="heading-2">
              Metrics Table
            </Heading>
            {/* <Button variant="ghost" size="base" onClick={handleClearData}>
              Reload default
            </Button> */}
          </Flex>
        )}
        <MetricTable />
        <Flex
          direction={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          gap={isMobile ? 'sm' : 'xl'}
        >
          <Flex
            direction="column"
            justifyContent={'start'}
            alignContent="start"
            width="full"
          >
            <Footnote>
              Adjusted for current line-height (
              {state.lineHeightMultiplier.toFixed(2)}). Includes a half-leading
              offset of {Math.round(state.halfLeading)} units.
              <br />
              Half Leading (units) ={' '}
              <span>
                {'((LineHeight \u00D7 UnitsPerEm) \u2212 UnitsPerEm) \u00F7 2'}
              </span>
            </Footnote>
          </Flex>
          <Flex justifyContent={isMobile ? 'center' : 'end'}>
            <Button
              variant="ghost"
              size="base"
              onClick={() => setShowConfirmDialog(true)}
            >
              Reload default
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {showConfirmDialog && (
        <ConfirmDialog
          title="Clear font data?"
          message="This will remove all loaded font metrics. This action cannot be undone."
          confirmText="Clear data"
          confirmVariant="danger"
          cancelText="Cancel"
          onConfirm={handleClearData}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </>
  );
};
