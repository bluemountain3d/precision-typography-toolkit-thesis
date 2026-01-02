import { Button } from '@/components/forms/Button';
import { Flex } from '@/components/layout/Flex';
import { Heading } from '@/components/typography/Heading';
import { removeLocalStorage } from '@/utils/localStorage';
import { useFontMetrics } from '../context';
import { MetricTable } from './MetricTable';

export const MetricTableBlock = () => {
  const { dispatch } = useFontMetrics();
  // const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleClearData = () => {
    dispatch({ type: 'RESET_FONT' });
    removeLocalStorage('fontMetrics');
    // setShowConfirmDialog(false);
  };

  return (
    <>
      <Flex width="full" direction="column" gap="sm">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading level={2} size="heading-2">
            Metrics Table
          </Heading>
          <Button variant="ghost" size="base" onClick={handleClearData}>
            Clear data
          </Button>
        </Flex>
        <MetricTable />
      </Flex>

      {/* TODO: Uncomment and configure after Header/Footer */}
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
