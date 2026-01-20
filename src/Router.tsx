import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { MainLayout } from '@/layouts/MainLayout';

// Lazy-loaded pages for code splitting and Suspense fallback
const StyleGuide = lazy(() =>
  import('@/pages/StyleGuide').then((m) => ({ default: m.StyleGuide }))
);
const PrecisionTypographyToolkit = lazy(() =>
  import('@/pages/tools/PrecisionTypographyToolkit').then((m) => ({
    default: m.PrecisionTypographyToolkit,
  }))
);
const FontMetricsArticle = lazy(() =>
  import('@/pages/learning/FontMetricsAndWebTypography').then((m) => ({
    default: m.FontMetricsArticle,
  }))
);
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const PrecisionAlignmentArticle = lazy(() =>
  import('@/pages/learning/PrecisionAlignment').then((m) => ({
    default: m.PrecisionAlignmentArticle,
  }))
);

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

      // Tools
      {
        path: 'tools/precision-typography-toolkit',
        element: <PrecisionTypographyToolkit />,
      },

      // Articles
      {
        path: 'learn/font-metrics-article',
        element: <FontMetricsArticle />,
      },
      {
        path: 'learn/precision-alignment-article',
        element: <PrecisionAlignmentArticle />,
      },

      // Other pages
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: null, // <NotFoundPage /> // TODO: Add 404 page component here
      },
    ],
    // fallbackElement: <PageLoader />,
    errorElement: null, // TODO: Add default ErrorPage component here
  },

  // StyleGuide - Development only
  // Accessible at /styleguide in dev mode, redirects to home in production
  {
    path: '/styleguide',
    element: import.meta.env.DEV ? <StyleGuide /> : <Navigate to="/" />,
  },
]);
