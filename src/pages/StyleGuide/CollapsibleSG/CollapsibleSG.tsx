import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { Collapsible } from '@/components/ui/Collapsible';
import { useMediaQuery } from '@/hooks';
import { Flex } from '@/components/layout/Flex';
import { queries } from '@/types';

export const CollapsibleSG = () => {
  const isUnderBreakpoint = useMediaQuery(queries.isUpToTabletLarge);

  return (
    <Flex direction="column" gap="2xl">
      <Container variant="boxed">
        <Heading level={2} size="heading-2">
          Collapsible:
        </Heading>
      </Container>

      <Container variant={isUnderBreakpoint ? 'boxed' : 'narrow'}>
        <Collapsible
          headingLevel={2}
          headingSize="heading-4"
          title="Collapsible Title"
        >
          <Container variant="prose" flow="em">
            <Heading level={3} size="heading-3">
              Lorem ipsum dolor sit amet
            </Heading>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
              voluptatem corporis officia dolorum aut incidunt repellat iste quo
              recusandae non, a delectus eligendi perferendis facere et iusto
              cupiditate dicta animi!
            </Text>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
              accusantium laboriosam ipsum blanditiis voluptate sed quo officia,
              maxime fugiat, sapiente exercitationem voluptatum, inventore
              possimus aspernatur assumenda? Dolore perspiciatis ipsa unde.
            </Text>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
              accusantium laboriosam ipsum blanditiis voluptate sed quo officia,
              maxime fugiat, sapiente exercitationem voluptatum, inventore
              possimus aspernatur assumenda? Dolore perspiciatis ipsa unde.
            </Text>
            <Heading level={4} size="heading-4">
              Lorem ipsum dolor sit amet
            </Heading>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
              accusantium laboriosam ipsum blanditiis voluptate sed quo officia,
              maxime fugiat, sapiente exercitationem voluptatum, inventore
              possimus aspernatur assumenda? Dolore perspiciatis ipsa unde.
            </Text>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
              voluptatem corporis officia dolorum aut incidunt repellat iste quo
              recusandae non, a delectus eligendi perferendis facere et iusto
              cupiditate dicta animi!
            </Text>
          </Container>
        </Collapsible>
      </Container>
    </Flex>
  );
};
