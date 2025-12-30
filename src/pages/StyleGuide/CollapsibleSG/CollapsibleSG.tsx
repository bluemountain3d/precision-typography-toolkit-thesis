import { Container } from '@/components/layout/Container';
import { Collapsible } from '@/components/ui/Collapsible';
import { useMediaQuery } from '@/hooks';
import { Flex } from '@/layouts/Flex';
import { queries } from '@/types';

export const CollapsibleSG = () => {
  const isUnderBreakpoint = useMediaQuery(queries.isUpToTabletLarge);

  return (
    <Flex direction="column" gap="lg">
      <Container variant="boxed">
        <h2 className="heading-2">Collapsible:</h2>
      </Container>

      <Container variant={isUnderBreakpoint ? 'boxed' : 'narrow'}>
        <Collapsible
          headingLevel={2}
          headingSize="heading-4"
          title="Collapsible Title"
        >
          <div className="flow-em">
            <h4 className="heading-3">Lorem ipsum dolor sit amet</h4>
            <p className="text-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
              voluptatem corporis officia dolorum aut incidunt repellat iste quo
              recusandae non, a delectus eligendi perferendis facere et iusto
              cupiditate dicta animi!
            </p>
            <p className="text-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
              accusantium laboriosam ipsum blanditiis voluptate sed quo officia,
              maxime fugiat, sapiente exercitationem voluptatum, inventore
              possimus aspernatur assumenda? Dolore perspiciatis ipsa unde.
            </p>
            <p className="text-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
              accusantium laboriosam ipsum blanditiis voluptate sed quo officia,
              maxime fugiat, sapiente exercitationem voluptatum, inventore
              possimus aspernatur assumenda? Dolore perspiciatis ipsa unde.
            </p>
          </div>
        </Collapsible>
      </Container>
    </Flex>
  );
};
