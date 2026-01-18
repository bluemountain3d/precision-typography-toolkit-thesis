import { Container } from '@/components/layout/Container';
import { PageSection } from '@/components/layout/PageSection';
import { ArticleIntroBlock } from './ArticleIntroBlock';
import { Flex } from '@/components/layout/Flex';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { AnatomyOfTheEmBoxBlock } from './AnatomyOfTheEmBoxBlock';

export const FontMetricsArticle = () => {
  const isBreakpoint = useMediaQuery(queries.isTabletLargeAndUp);

  return (
    <PageSection as="section" padding="large">
      <Container variant={isBreakpoint ? 'narrow' : 'boxed'}>
        <Flex direction="column" alignItems="center" gap="4xl">
          <ArticleIntroBlock />
          <AnatomyOfTheEmBoxBlock />
        </Flex>
      </Container>
    </PageSection>
  );
};
