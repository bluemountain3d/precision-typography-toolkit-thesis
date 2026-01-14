import styles from './TextWrapperBlock.module.scss';
import classNames from 'clsx';

interface TextWrapperBlockProps {
  
}

export const TextWrapperBlock = ({  }: TextWrapperBlockProps) => {
  return (
    <div className={classNames(
      styles.textWrapperBlock,
    )}>
      
    </div>
  );
};