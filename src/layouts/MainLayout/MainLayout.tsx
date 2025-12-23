import classNames from 'clsx';
import styles from './MainLayout.module.scss';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className={classNames(styles['page-wrapper'])}>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
};
