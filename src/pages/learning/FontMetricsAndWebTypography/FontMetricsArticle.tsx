import { Container } from '@/components/layout/Container';
import { PageSection } from '@/components/layout/PageSection';
import { ArticleIntroBlock } from './ArticleIntroBlock';
import { Flex } from '@/components/layout/Flex';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';

export const FontMetricsArticle = () => {
  const isBreakpoint = useMediaQuery(queries.isTabletLargeAndUp);

  return (
    <PageSection as="section">
      <Container variant={isBreakpoint ? 'narrow' : 'boxed'}>
        <Flex direction="column" alignItems="center" gap="4xl">
          <ArticleIntroBlock />
        </Flex>
      </Container>
    </PageSection>
  );
};
