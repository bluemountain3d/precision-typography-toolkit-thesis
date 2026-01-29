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
import { Heading } from '@/components/typography/Heading';
import { Flex } from '@/components/layout/Flex';

export const ButtonsSG = () => {
  return (
    <Container variant="boxed">
      <Flex direction="column" gap="lg">
        <Heading level={2} size="heading-2" marginBottom="lg">
          Button:
        </Heading>
        <Heading level={3} size="heading-4" weight="semibold">
          Base Buttons
        </Heading>
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
        <Heading level={3} size="heading-4" weight="semibold">
          State Buttons
        </Heading>
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
        <Heading level={3} size="heading-4" weight="semibold">
          Disabled Buttons
        </Heading>
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
