import katex from 'katex';
import 'katex/dist/katex.min.css';

export const Math = ({
  formula,
  display = false,
}: {
  formula: string;
  display?: boolean;
}) => {
  const html = katex.renderToString(formula, {
    throwOnError: false,
    displayMode: display,
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
