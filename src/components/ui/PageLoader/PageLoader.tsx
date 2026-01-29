import styles from './PageLoader.module.scss';
import classNames from 'clsx';

export const PageLoader = () => {
  return (
    <div className={classNames(styles['page-loader'])}>
      <span className={classNames('loader-xl')}></span>
      <span>Loading...</span>
    </div>
  );
};
