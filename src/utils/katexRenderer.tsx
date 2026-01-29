import katex from 'katex';
import 'katex/dist/katex.min.css';

export const KatexRenderer = ({
  formula,
  display = false,
}: {
  formula: string;
  display?: boolean;
}) => {
  const html = katex.renderToString(formula, {
    displayMode: display,
    throwOnError: false,
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};
