/// <reference types="vite/client" />

// CSS Modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// SVG Icons
declare module '*.svg?react' {
  import { FunctionComponent, SVGProps } from 'react';
  const content: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
