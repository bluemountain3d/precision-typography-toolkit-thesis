import styles from './ProductLockup.module.scss';
import classNames from 'clsx';

import { Flex } from '@/components/layout/Flex';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { PttLogo } from '@/components/common/PttLogo';

export const ProductLockup = () => {
  const isMobile = useMediaQuery(queries.isUpToTabletLarge);

  return (
    <Flex
      direction={isMobile ? 'column' : 'row'}
      justifyContent="center"
      gap="md"
      width={isMobile ? 'auto' : 'full'}
    >
      <div
        className={classNames(
          styles['product-lockup__logo'],
          isMobile ? 'mx-auto' : ''
        )}
      >
        <PttLogo />
      </div>
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
