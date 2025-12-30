import { Toggle } from '@/components/forms/Toggle';
import { ButtonGroup } from '@components/layout/ButtonGroup';
import { Container } from '@components/layout/Container';
import { Flex } from '@layouts/Flex';
import { useState } from 'react';
import styles from './Toggle.SG.module.scss';
import classNames from 'clsx';

export const ToggleSG = () => {
  const [toggles, setToggles] = useState({
    feature1: false,
    feature2: false,
  });

  const handleToggleChange = (key: string) => (checked: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <Container variant="boxed">
      <Flex direction="column" gap="xl">
        <h2 className="heading-2">Toggle:</h2>
        <h3 className="heading-4">Active</h3>
        <ButtonGroup align="left" marginBottom="md">
          <Toggle
            toggleId="kerning-on-off"
            onChange={handleToggleChange('feature1')}
            checked={toggles.feature1}
            label={
              <>
                font-kerning:{' '}
                <span className={classNames(styles.value)}>
                  {toggles.feature1 ? 'normal' : 'none'};
                </span>
              </>
            }
            labelPosition="before"
          />
        </ButtonGroup>
        <h3 className="heading-4">Disabled</h3>
        <ButtonGroup align="left" marginBottom="md">
          <Toggle
            toggleId="kerning-on-off-disabled"
            onChange={handleToggleChange('feature2')}
            checked={toggles.feature2}
            label="box-shadow: none;"
            disabled
          />
        </ButtonGroup>
      </Flex>
    </Container>
  );
};
