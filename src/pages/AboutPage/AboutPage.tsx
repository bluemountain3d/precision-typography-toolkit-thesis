import { Container } from '@/components/layout/Container';
import { Flex } from '@/components/layout/Flex';
import { PageSection } from '@/components/layout/PageSection';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { TextBox } from '@/components/typography/TextBox';

export const AboutPage = () => {
  return (
    <PageSection id="about-hero" padding="large">
      <Container variant="boxed">
        <Flex direction="column" gap="4xl" width="full" alignItems="center">
          <TextBox as="header">
            <Heading level={1} size="heading-1">
              About PrecisionSpec.dev
            </Heading>
          </TextBox>

          <Flex as="article" direction="column" gap="3xl">
            <TextBox as="section" flow="em">
              <Heading level={2} size="heading-3">
                From Thesis Project to Toolbox
              </Heading>
              <Text>
                PrecisionSpec.dev started as my thesis project at
                Medieinstitutet, a way to solve a concrete problem I encountered
                as a front-end developer: the lack of precise typographic
                measurements in CSS.
              </Text>
              <Text>
                But during development, the vision grew. Why stop at typography
                when so many other aspects of web development suffer from the
                same problem – that we rely on eyeballing instead of precision?
              </Text>
            </TextBox>

            <TextBox as="section" flow="em">
              <Heading level={2} size="heading-3">
                Typography Toolkit – Where It Began
              </Heading>
              <Text>
                The first module extracts typographic measurements directly from
                font files in the browser. Cap height, x-height, baseline – data
                that previously required manual guessing is now exported as CSS
                custom properties ready to use.
              </Text>
              <Text>
                Client-side analysis via fontkit means nothing leaves your
                computer. You upload a font, get exact values, and can build
                typographic systems with mathematical precision.
              </Text>
            </TextBox>

            <TextBox as="section" flow="em">
              <Heading level={2} size="heading-3">
                The Vision: Precision as Standard
              </Heading>
              <Text>
                This is meant to become more than a font tool. My vision is for
                PrecisionSpec to grow into a hub for developers who refuse to
                accept approximate when exact is possible.
              </Text>

              <TextBox flow="em">
                <Heading level={3} size="heading-4">
                  Future modules might include:
                </Heading>
                <dl>
                  <dt>Color Spec</dt>
                  <dd>
                    LCH/OKLCH color spaces and advanced contrast calculations
                  </dd>

                  <dt>Layout Spec</dt>
                  <dd>
                    Visualization of grid systems and geometric proportions
                  </dd>
                </dl>
              </TextBox>
            </TextBox>

            <TextBox as="section" flow="em">
              <Heading level={2} size="heading-3">
                Learn – Theory Behind the Tools
              </Heading>
              <Text>
                Tools without understanding are hollow. The Learn section is
                being built out with articles that explain <em>why</em> these
                values matter – how font-metrics affect vertical rhythm, how
                upcoming CSS standards like text-box-trim will change the
                workflow, and the small details that make a big difference.
              </Text>
            </TextBox>
          </Flex>
        </Flex>
      </Container>
    </PageSection>
  );
};
