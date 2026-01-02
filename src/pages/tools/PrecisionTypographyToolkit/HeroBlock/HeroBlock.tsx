import { Flex } from '@/components/layout/Flex';
import { FontUpload } from './FontUpload';
import { HeroText } from './HeroText';
import { ProductLockup } from './ProductLockup';

export const HeroBlock = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap="2xl"
      width="full"
    >
      <ProductLockup />
      <HeroText />
      <FontUpload />
    </Flex>
  );
};
