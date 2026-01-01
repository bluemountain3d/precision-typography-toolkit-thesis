import { Container } from '@/components/layout/Container';
import { Img } from '@/components/ui/Image';
import blurPlaceholders from '@/data/blur-placeholders.json';
import pttLogo from '@/assets/images/precision-typography/logo/precision-typography-logo-@1x.png';
import pttLogo_1x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@1x.webp';
import pttLogo_15x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@1.5x.webp';
import pttLogo_2x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@2x.webp';
import pttLogo_3x_webp from '@/assets/images/precision-typography/logo/precision-typography-logo-@3x.webp';
import { Heading } from '@/components/typography/Heading';

export const ImgSG = () => {
  return (
    <>
      {/* Test Image Component */}
      <Container variant="boxed">
        <Heading level={2} size="heading-2">
          Img:
        </Heading>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '512px',
            height: 'auto',
            margin: '100px auto',
          }}
        >
          <Img
            src={pttLogo}
            alt="test image"
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
        </div>
      </Container>
    </>
  );
};
