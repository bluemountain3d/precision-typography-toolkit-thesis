import styles from './ProductLockup.module.scss';
import classNames from 'clsx';
import blurPlaceholders from '@/data/blur-placeholders.json';
import pttLogo from '@/assets/images/precision-typography/logo/precision-typography-logo-@1x.png';
import pttLogo_1x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@1x.webp';
import pttLogo_15x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@1.5x.webp';
import pttLogo_2x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@2x.webp';
import pttLogo_3x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@3x.webp';

import { Img } from '@/components/ui/Image';
import { Flex } from '@/components/layout/Flex';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';

export const ProductLockup = () => {
  const isMobile = useMediaQuery(queries.isUpToTabletLarge);

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
        // sizes="(max-width: 768px) 30vw, (max-width: 1024px) 192px, 25vw"
        sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 223px"
        loading="eager"
        fetchPriority="high"
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
        as="div"
        direction="column"
        justifyContent="center"
        // alignItems={isMobile ? 'center' : 'start'}
        alignItems="start"
        width="auto"
        className={styles['product-lockup__brand']}
      >
        <span className={styles['product-lockup__brand-pt1']}>
          Precision Typography
        </span>
        <span className={styles['product-lockup__brand-pt2']}>Toolkit</span>
      </Flex>
    </Flex>
  );
};
