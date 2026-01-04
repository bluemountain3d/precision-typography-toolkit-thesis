import classNames from 'clsx';
import styles from './Footer.module.scss';
import { PageSection } from '@/components/layout/PageSection';
import { Container } from '@/components/layout/Container';
import { Flex } from '@/components/layout/Flex';
import { Brand } from '@/components/common/Brand';
import { ButtonGroup } from '@/components/layout/ButtonGroup';
import { Button } from '@/components/forms/Button';
import { AngleUpIcon } from '@/assets/icons';

export const Footer = () => {
  return (
    <PageSection
      as="footer"
      padding="medium"
      className={classNames(styles.footer)}
    >
      <Container variant="boxed">
        <Flex direction="column" alignItems="center" rowGap="md" className={styles['footer__inner']}>
          <Flex direction="column" rowGap="md">
            <Brand size="md"></Brand>
            <ButtonGroup gap="none">
              <Button href="/" variant="link">
                Home
              </Button>
              <Button href="about" variant="link">
                About
              </Button>
              <Button
                href="https://github.com/bluemountain3d"
                external
                variant="link"
              >
                GitHub
              </Button>
              <Button
                href="https://portfolio.egileskilsson.se"
                external
                variant="link"
              >
                Portfolio
              </Button>
            </ButtonGroup>
          </Flex>
          <Button
            iconOnly
            variant="ghost"
            onClick={() => window.scrollTo({ top: 0 })}
            icon={AngleUpIcon}
            aria-label="Back to top"
          />
        </Flex>
      </Container>
    </PageSection>
  );
};
