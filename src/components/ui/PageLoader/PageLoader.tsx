import styles from './PageLoader.module.scss';
import classNames from 'clsx';

interface PageLoaderProps {
  
}

export const PageLoader = ({  }: PageLoaderProps) => {
  return (
    <div className={classNames(
      styles['page-loader'],
    )}>
      <span className={classNames('loader-xl')}></span>
      <span>Loading...</span>
    </div>
  );
};