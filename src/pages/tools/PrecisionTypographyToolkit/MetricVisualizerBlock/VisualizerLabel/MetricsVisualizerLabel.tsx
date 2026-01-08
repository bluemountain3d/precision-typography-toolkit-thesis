import { Flex } from '@/components/layout/Flex';
// import styles from './MetricsVisualizerLabel.module.scss';
// import classNames from 'clsx';
import { useFontMetrics } from '../../context';
import { ButtonGroup } from '@/components/layout/ButtonGroup';
import { Button } from '@/components/forms/Button';
import { isMetricVisualized, MetricsNiceName, getMetricValue } from '@/utils';

interface MetricsVisualizerLabelProps {}

export const MetricsVisualizerLabel = ({}: MetricsVisualizerLabelProps) => {
  const { state } = useFontMetrics();

  return (
    <ButtonGroup>
      <Button variant="label" radius="sm">
        <Flex as="span" justifyContent="center" alignItems="center">
          {state.selectedMetric && (
            <Flex
              as="span"
              justifyContent="center"
              alignItems="baseline"
              gap="xl"
            >
              <span className="font-weight-semibold">.::</span>
              {isMetricVisualized(state.selectedMetric) && (
                <Flex
                  as="span"
                  justifyContent="center"
                  alignItems="baseline"
                  gap="xs"
                >
                  <span className="color-text-primary">
                    {MetricsNiceName[state.selectedMetric]}:
                  </span>
                  {getMetricValue(state.selectedMetric, state)}
                </Flex>
              )}

              {!isMetricVisualized(state.selectedMetric) && (
                <Flex
                  as="span"
                  justifyContent="center"
                  alignItems="baseline"
                  gap="xs"
                >
                  <span>{MetricsNiceName[state.selectedMetric]}:</span>
                  <span>is not visualized in the diagram</span>
                </Flex>
              )}
              <span className="font-weight-semibold">::.</span>
            </Flex>
          )}

          {!state.selectedMetric && (
            <Flex
              as="span"
              justifyContent="center"
              alignItems="baseline"
              gap="xl"
            >
              <span className="font-weight-semibold color-text-secondary">
                .::
              </span>
              <span className="color-text-secondary">
                Select a metric to see its values
              </span>
              <span className="font-weight-semibold color-text-secondary">
                ::.
              </span>
            </Flex>
          )}
        </Flex>
      </Button>
    </ButtonGroup>
  );
};

// className={classNames(styles['metrics-visualizer-label'])}
