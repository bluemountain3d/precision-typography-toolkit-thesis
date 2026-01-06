import { Button } from '@/components/forms/Button';
import { Flex } from '@/components/layout/Flex';
import { Heading } from '@/components/typography/Heading';
import { removeLocalStorage } from '@/utils/localStorage';
import { useFontMetrics } from '../context';
import { MetricTable } from './MetricTable';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';

export const MetricTableBlock = () => {
  const { dispatch } = useFontMetrics();
  // const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const isMobile = useMediaQuery(queries.isUpToTablet);

  const handleClearData = () => {
    dispatch({ type: 'RESET_FONT' });
    removeLocalStorage('fontMetrics');
  };

  return (
    <>
      <Flex width="full" direction="column" gap="sm">
        {!isMobile && (
          <Flex justifyContent="space-between" alignItems="center">
            <Heading level={2} size="heading-2">
              Metrics Table
            </Heading>
            <Button variant="ghost" size="base" onClick={handleClearData}>
              Reload default
            </Button>
          </Flex>
        )}
        <MetricTable />
        {isMobile && (
          <Flex justifyContent="end" alignItems="center">
            <Button variant="ghost" size="base" onClick={handleClearData}>
              Reload default
            </Button>
          </Flex>
        )}
      </Flex>

      {/* TODO: Uncomment and configure */}
      {/* {showConfirmDialog && (
        <ConfirmDialog
          title="Clear font data?"
          message="This will remove all loaded font metrics. This action cannot be undone."
          onConfirm={handleClearData}
          onCancel={() => setShowConfirmDialog(false)}
          confirmText="Clear data"
          confirmVariant="danger"
        />
      )} */}
    </>
  );
};
