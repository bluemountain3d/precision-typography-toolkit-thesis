import { lazy, Suspense } from 'react';

const KatexRenderer = lazy(() =>
  import('./katexRenderer').then((mod) => ({ default: mod.KatexRenderer }))
);

export const Math = ({
  formula,
  display = false,
}: {
  formula: string;
  display?: boolean;
}) => {
  return (
    <Suspense fallback={<span className="loading">...</span>}>
      <KatexRenderer formula={formula} display={display} />
    </Suspense>
  );
};
