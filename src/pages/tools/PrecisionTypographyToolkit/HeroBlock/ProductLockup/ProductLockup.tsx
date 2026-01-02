import styles from './ProductLockup.module.scss';
import classNames from 'clsx';
import blurPlaceholders from '@/data/blur-placeholders.json';
import pttLogo from '@/assets/images/precision-typography/logo/precision-typography-logo-@1x.png';
import pttLogo_1x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@1x.webp';
import pttLogo_15x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@1.5x.webp';
import pttLogo_2x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@2x.webp';
import pttLogo_3x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@3x.webp';

import { Img } from '@/components/ui/Image';
import { Heading } from '@/components/typography/Heading';
import { Flex } from '@/components/layout/Flex';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { Text } from '@/components/typography/Text';

export const ProductLockup = () => {
  const isMobile = useMediaQuery(queries.isUpToPhablet);

  return (
    <Flex
      direction={isMobile ? 'column' : 'row'}
      justifyContent="center"
      gap="md"
      width={isMobile ? 'auto' : 'full'}
    >
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
        aspectRatio="1/1"
        wrapperClassName={classNames(
          styles['product-lockup__logo'],
          isMobile ? 'mx-auto' : ''
        )}
      />
      <Flex
        as="hgroup"
        direction="column"
        justifyContent="center"
        alignItems={isMobile ? 'center' : 'start'}
        gap="lg"
        width="auto"
      >
        <Heading level={2} size="heading-2" variant="primary">
          Precision Typography{'\n'}
          <span></span>
        </Heading>
        <Text
          variant="link"
          weight="medium"
          family="mono"
          align="left"
          className="font-size-heading-3"
        >
          Toolkit
        </Text>
      </Flex>
    </Flex>
  );
};
