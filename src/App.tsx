import '@/styles/globals.scss';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './Router';
import { PageLoader } from './components/ui/PageLoader';
import { Suspense } from 'react';

const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={appRouter}></RouterProvider>
    </Suspense>
  );
};

export default App;
