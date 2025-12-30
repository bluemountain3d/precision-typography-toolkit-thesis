import {
  SassIcon,
  SuccessIcon,
  WarningIcon,
  DangerIcon,
  InfoIcon,
} from '@/assets/icons';
import { Button } from '@/components/forms/Button';
import { ButtonGroup } from '@/components/layout/ButtonGroup';
import { Container } from '@/components/layout/Container';
import { Flex } from '@/layouts/Flex';

export const ButtonsSG = () => {
  return (
    <Container variant="boxed">
      <Flex direction="column" gap="xl">
        <h2 className="heading-2">Button:</h2>
        <h3 className="heading-4">Base Buttons</h3>
        <ButtonGroup align="left" marginBottom="md">
          <Button variant="primary" icon={SassIcon}>
            Primary
          </Button>
          <Button variant="secondary" icon={SassIcon}>
            Secondary
          </Button>
          <Button variant="accent" icon={SassIcon}>
            Accent
          </Button>
          <Button variant="ghost" icon={SassIcon}>
            Ghost
          </Button>
          <Button variant="link">Link</Button>
        </ButtonGroup>
        <h3 className="heading-4">State Buttons</h3>
        <ButtonGroup align="left" marginBottom="md">
          <Button variant="success" icon={SuccessIcon}>
            Success
          </Button>
          <Button variant="warning" icon={WarningIcon}>
            Warning
          </Button>
          <Button variant="danger" icon={DangerIcon}>
            Danger
          </Button>
          <Button variant="info" icon={InfoIcon}>
            Info
          </Button>
        </ButtonGroup>
        <h3 className="heading-4">Disabled Buttons</h3>
        <ButtonGroup align="left" marginBottom="md">
          <Button variant="primary" icon={SassIcon} disabled>
            Disabled
          </Button>
          <Button variant="ghost" icon={SassIcon} disabled>
            Ghost Disabled
          </Button>
          <Button variant="link" disabled>
            Link Disabled
          </Button>
        </ButtonGroup>
      </Flex>
    </Container>
  );
};
