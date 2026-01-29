import { Container } from '@/components/layout/Container';
import { PageSection } from '@/components/layout/PageSection';
import { ArticleIntroBlock } from './ArticleIntroBlock';
import { Flex } from '@/components/layout/Flex';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { AnatomyOfTheEmBoxBlock } from './AnatomyOfTheEmBoxBlock';
import { MathOfPrecisionBlock } from './MathOfPrecisionBlock';
import { ButtonGroup } from '@/components/layout/ButtonGroup';
import { Button } from '@/components/forms/Button';
import { TextBox } from '@/components/typography/TextBox';
import { Text } from '@/components/typography/Text';

export const FontMetricsArticle = () => {
  const isBreakpoint = useMediaQuery(queries.isTabletLargeAndUp);

  return (
    <PageSection as="section" padding="large">
      <Container variant={isBreakpoint ? 'narrow' : 'boxed'}>
        <Flex direction="column" alignItems="center" gap="4xl">
          <ArticleIntroBlock />
          <AnatomyOfTheEmBoxBlock />
          <MathOfPrecisionBlock />

          {/* TODO! Articles about how to implement metrics */}
          {/* <TextBox flow="em">
            <Text>{'  '}</Text>
            <ButtonGroup>
              <Button href="/">
                Implement using Vanilla CSS
              </Button>
              <Button href="/">
                Implement using SCSS
              </Button>
            </ButtonGroup>
          </TextBox> */}

          <TextBox flow="em">
            <Text>
              <strong>Next:</strong> Master horizontal precision by calculating
              optical edges and eliminating side-bearing padding for
              pixel-perfect grid alignment.
            </Text>
            <ButtonGroup>
              <Button href="/learn/precision-alignment-article">
                Optical Edge Alignment
              </Button>
            </ButtonGroup>
          </TextBox>
        </Flex>
      </Container>
    </PageSection>
  );
};
