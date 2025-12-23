import { createBrowserRouter, Navigate } from 'react-router-dom';
import { StyleGuide } from './pages/StyleGuide';
import { MainLayout } from './layouts/MainLayout';
import { PrecisionTypographyToolkit } from '@pages/tools/PrecisionTypographyToolkit';
import { FontMetricsArticle } from './pages/learning/FontMetricsAndWebTypography';

export const appRouter = createBrowserRouter([
  // Main application routes with shared layout
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <PrecisionTypographyToolkit />,
        // element: <HomePage />, // TODO: Switch to when HomePage is done
      },
      {
        path: 'tools/precision-typography-toolkit',
        element: <PrecisionTypographyToolkit />,
      },
      {
        path: 'learn/font-metrics-article',
        element: <FontMetricsArticle />,
      },
      {
        path: '*',
        element: null, // <NotFoundPage /> // TODO: Add 404 page component here
      },
    ],
    errorElement: null, // TODO: Add default ErrorPage component here
  },

  // StyleGuide - Development only
  // Accessible at /styleguide in dev mode, redirects to home in production
  {
    path: '/styleguide',
    element: import.meta.env.DEV ? <StyleGuide /> : <Navigate to="/" />,
  },
]);
