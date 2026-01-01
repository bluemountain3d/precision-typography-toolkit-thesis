import blurPlaceholders from '@/data/blur-placeholders.json';
import pttLogo from '@/assets/images/precision-typography/logo/precision-typography-logo-@1x.png';
import pttLogo_1x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@1x.webp';
import pttLogo_15x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@1.5x.webp';
import pttLogo_2x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@2x.webp';
import pttLogo_3x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@3x.webp';

import { Flex } from '@/layouts/Flex';
import { Img } from '@/components/ui/Image';
import { Heading } from '@/components/typography/Heading';

export const ProductLockup = () => {
  return (
    <Flex direction="row" justifyContent="center" gap="md">
      <Img
        src={pttLogo}
        alt="Precision Typography Toolkit Logo"
        sources={{
          webp: {
            srcSet: `${pttLogo_1x_webp} 1x, ${pttLogo_15x_webp} 1.5x, ${pttLogo_2x_webp} 2x, ${pttLogo_3x_webp} 3x`,
          },
        }}
        loading="eager"
        blurDataURL={
          blurPlaceholders[
            'precision-typography/logo/precision-typography-logo-@1x.webp'
          ]
        }
      />
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="start"
        gap="lg"
      >
        <Heading level={2} size="heading-2">
          Precision Typography
        </Heading>
        <Heading level={2} size="heading-3" weight="medium">
          Toolkit
        </Heading>
      </Flex>
    </Flex>
  );
};
