import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { TextBox } from '@/components/typography/TextBox';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';

export const HeroText = () => {
  const isMobile = useMediaQuery(queries.isUpToPhablet);

  return (
    <>
      <TextBox widthSize="lg" flow="em">
        <Heading level={1} size="heading-1" align={isMobile ? 'left' : 'left'}>
          Stop guessing, Start measuring
        </Heading>
        <Text size="lg" weight="semibold" hyphens="auto">
          The web is imprecise, but your typography doesn't have to be. Upload
          your font, visualize its hidden metrics, and export precise CSS values
          for perfect optical balance.
        </Text>
      </TextBox>
    </>
  );
};
