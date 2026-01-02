import styles from './TextBox.module.scss';
import classNames from 'clsx';
import type { TextBoxProps } from './TextBox.types';

/**
 * A typography layout container designed to control line length (measure) and vertical rhythm.
 *
 * It combines intelligent `max-width` calculations (based on font metrics) with
 * context-aware spacing rules (flow) to ensure optimal readability for long-form text.
 *
 * @example
 * // 1. Basic Article Layout
 * // Uses default 70ch width and 'em' based flow for natural reading rhythm.
 * <TextBox flow="em" centered>
 * <Heading>The History of Typography</Heading>
 * <Text>Paragraph about history...</Text>
 * <ul>
 * <li>List item 1</li>
 * <li>List item 2</li>
 * </ul>
 * </TextBox>
 *
 * @example
 * // 2. Intro Text (Larger scale)
 * // Increasing `widthSize` scales up the text AND the max-width container
 * // so the line length remains visually consistent relative to the text size.
 * <TextBox widthSize="lg" maxWidth="60ch">
 * <Text>This is a large introductory statement.</Text>
 * </TextBox>
 *
 * @example
 * // 3. Component Wrapper
 * // Using 'space' flow to enforce strict design system spacing between children.
 * <TextBox flow="space" maxWidth="none">
 * <Card />
 * <Card />
 * </TextBox>
 */
export const TextBox = ({
  children,
  widthSize = 'base',
  maxWidth = '70ch',
  flow,
  centered,
  marginTop,
  marginBottom,
  className,
  ...rest
}: TextBoxProps) => {
  return (
    <div
      className={classNames(
        styles['text-box'],
        widthSize && styles[`text-box--${widthSize}`],
        styles[`text-box--max-width-${maxWidth}`],
        flow && `flow-${flow}`,
        centered && styles['text-box--centered'],
        marginTop && `mt-${marginTop}`,
        marginBottom && `mb-${marginBottom}`,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
