import '@styles/globals.scss';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './Router';

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
};

export default App;
