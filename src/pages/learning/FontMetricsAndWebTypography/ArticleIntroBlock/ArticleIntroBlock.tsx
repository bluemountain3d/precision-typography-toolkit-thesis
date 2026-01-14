import styles from './ArticleIntroBlock.module.scss';
import classNames from 'clsx';
import { Flex } from '@/components/layout/Flex';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { TextBox } from '@/components/typography/TextBox';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { TextMediaBlock } from '@/components/content/TextMediaBlock';
import { InlineSVG } from '@/components/ui/InlineSVG';

export const ArticleIntroBlock = () => {
  const isBreakpoint = useMediaQuery(queries.isTabletLargeAndUp);

  const textContent = (
    <Flex direction="column" gap="2xl" alignItems="center" width="full">
      <TextBox flow="em">
        <Heading level={2} size="heading-3">
          Why line-height is lying to you
        </Heading>
        <Text size="md" weight="semibold" hyphens="auto">
          Ever set a margin to 20 pixels, only to see 30? That gap you can't
          explain isn't a bug, it is invisible spacing built into every font.
        </Text>
        <Text size="base" hyphens="auto">
          This discrepancy isn't just a minor annoyance; it's a systemic issue
          in how web layout engines treat typography. Historically, type was
          designed for paper, where the physical block of lead determined the
          line spacing. On the web, we've inherited this 'block' mentality, but
          with the added complexity of digital rendering engines that distribute
          space in ways that often defy our intent for pixel-perfect alignment.
        </Text>
        <Text size="base" hyphens="auto">
          To bridge this gap, we have to look past the surface. We need to
          dissect the 'Units Per Em' (UPM) and the specific coordinate system
          defined within the font file. By understanding metrics like Cap
          Height, Ascent, and Descent, we can finally stop treating text as a
          black box and start controlling it with the same mathematical
          certainty we use for layout grids and spacing scales.
        </Text>
      </TextBox>
    </Flex>
  );
  const mediaContent = (
    <InlineSVG
      viewBox="0 0 256 304"
      title=""
      fitToContainer={isBreakpoint ? true : false}
      className={classNames(
        styles['article-intro-block__diagram'],
        isBreakpoint ? 'py-lg' : 'px-xl'
      )}
    >
      <rect
        y="253.333"
        width="256"
        height="50.6667"
        fill="var(--color-primary-lines)"
      />
      <rect width="256" height="50.6667" fill="var(--color-primary-lines)" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M242.319 137.003C242.589 137.003 242.792 137.476 242.927 138.422C243.197 139.368 243.333 140.381 243.333 141.462C243.332 143.083 243.129 144.704 242.724 146.325C242.454 147.947 242.049 148.623 241.508 148.353C239.212 147.407 236.982 146.663 234.821 146.123C232.794 145.583 230.497 145.313 227.93 145.312C226.417 145.312 224.776 145.46 223.008 145.757C224.495 147.265 225.731 148.94 226.714 150.784C228.876 154.702 229.956 158.823 229.957 163.146C229.957 167.875 228.605 172.334 225.903 176.522C223.336 180.576 219.62 183.819 214.756 186.251C210.028 188.683 204.488 189.898 198.138 189.898C193.252 189.898 188.845 189.218 184.918 187.857C182.439 189.965 180.63 191.929 179.493 193.749C178.142 195.911 177.466 198.276 177.466 200.843C177.466 203.95 178.48 206.315 180.506 207.937C182.533 209.558 185.776 210.706 190.234 211.382C194.828 211.922 201.313 212.192 209.69 212.192C215.77 212.192 221.107 212.598 225.701 213.408C230.294 214.084 234.213 215.907 237.456 218.88C240.833 221.987 242.522 226.581 242.522 232.661C242.522 239.957 240.157 246.713 235.428 252.928C230.699 259.278 224.417 264.278 216.581 267.926C208.879 271.709 200.772 273.601 192.26 273.601C182.938 273.601 175.574 271.506 170.169 267.317C164.9 263.264 162.266 257.927 162.266 251.307C162.266 241.337 169.214 231.505 183.109 221.808C182.844 221.778 182.584 221.749 182.33 221.718C177.871 221.177 174.223 219.826 171.386 217.664C168.684 215.637 167.333 212.462 167.333 208.139C167.333 203.815 168.616 199.965 171.183 196.587C173.521 193.664 177.073 190.336 181.839 186.604C181.733 186.554 181.625 186.505 181.519 186.453C176.925 184.021 173.413 180.779 170.981 176.726C168.549 172.672 167.333 168.281 167.333 163.552C167.333 155.986 170.305 149.703 176.25 144.704C182.329 139.705 190.099 137.205 199.556 137.205C206.447 137.205 212.122 138.489 216.581 141.056C218.005 141.81 219.314 142.642 220.504 143.553C223.741 141.67 226.757 140.23 229.551 139.232C233.469 137.746 237.725 137.003 242.319 137.003ZM188.023 222.243C184.509 224.45 181.597 226.706 179.29 229.014C175.642 232.932 173.818 238.134 173.818 244.619C173.818 251.645 176.115 257.184 180.708 261.237C185.437 265.426 192.058 267.52 200.57 267.521C209.892 267.521 217.526 265.021 223.471 260.021C229.416 255.157 232.388 248.604 232.388 240.362C232.388 234.958 231.038 230.972 228.335 228.405C225.768 225.973 222.323 224.42 218 223.744C213.811 223.069 207.866 222.73 200.165 222.73C195.542 222.646 191.495 222.484 188.023 222.243ZM194.693 140.245C189.964 140.245 186.248 141.732 183.545 144.704C180.978 147.677 179.695 152.338 179.695 158.688C179.695 164.768 180.776 169.97 182.938 174.293C185.1 178.481 187.87 181.657 191.248 183.818C194.76 185.845 198.341 186.858 201.989 186.858C206.582 186.858 210.23 185.305 212.932 182.197C215.769 178.955 217.189 174.091 217.189 167.605C217.189 159.229 215.027 152.608 210.704 147.744C206.38 142.745 201.043 140.245 194.693 140.245Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M82.7905 87.7549C83.4658 87.7549 83.8711 87.9573 84.0063 88.3623L131.835 189.088C136.429 199.086 140.348 205.842 143.59 209.354C146.833 212.732 150.684 214.422 155.142 214.422C155.683 214.422 155.954 214.827 155.954 215.638C155.954 216.448 155.682 216.854 155.142 216.854C152.575 216.854 148.589 216.718 143.185 216.448C137.781 216.178 133.862 216.043 131.43 216.043C128.458 216.043 124.675 216.178 120.082 216.448C115.758 216.718 112.448 216.853 110.151 216.854C109.61 216.854 109.339 216.448 109.339 215.638C109.339 214.827 109.61 214.422 110.151 214.422C115.285 214.422 118.932 213.949 121.094 213.003C123.391 212.057 124.539 210.368 124.54 207.937C124.54 205.91 123.729 203.072 122.108 199.424L103.977 161.12H55.5425L42.8647 191.115C40.9734 195.709 40.0279 199.492 40.0278 202.464C40.0278 210.435 46.6483 214.422 59.8892 214.422C60.5647 214.422 60.9028 214.827 60.9028 215.638C60.9028 216.448 60.5646 216.854 59.8892 216.854C57.4572 216.854 53.9439 216.718 49.3501 216.448C44.216 216.178 39.7571 216.043 35.9741 216.043C32.4614 216.043 28.4084 216.178 23.8149 216.448C19.7616 216.718 16.3834 216.854 13.6812 216.854C13.0057 216.854 12.6676 216.448 12.6675 215.638C12.6675 214.827 13.0056 214.422 13.6812 214.422C17.4643 214.422 20.6394 213.746 23.2065 212.395C25.9087 210.908 28.4087 208.409 30.7056 204.896C33.1375 201.249 35.7716 196.046 38.6089 189.291L81.3716 88.3623C81.6418 87.9571 82.1151 87.7549 82.7905 87.7549ZM57.2554 157.066H102.058L78.3892 107.063L57.2554 157.066Z"
        fill="white"
      />
    </InlineSVG>
  );

  return (
    <TextMediaBlock
      gap="2xl"
      breakpoint="isTabletLargeAndUp"
      textContent={textContent}
      mediaContent={mediaContent}
      reverseOrder={isBreakpoint ? false : true}
      contentRatio={isBreakpoint ? '3:2' : undefined}
    />
  );
};
