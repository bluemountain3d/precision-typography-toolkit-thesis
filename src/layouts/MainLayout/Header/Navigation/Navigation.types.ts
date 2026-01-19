export interface NavLink {
  label: string;
  path?: string;
  children?: NavLink[] | undefined;
}

export const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Tools',
    path: '/tools',
    children: [
      {
        label: 'Precision Typography Toolkit',
        path: '/tools/precision-typography-toolkit',
      },
    ],
  },
  {
    label: 'Learn',
    path: '/learn',
    children: [
      {
        label: 'Why line-height is lying to you',
        path: '/learn/font-metrics-article',
      },
      {
        label: 'Precision Alignment: Solving for Optical Balance',
        path: '/learn/precision-alignment-article',
      },
    ],
  },
  { label: 'About', path: '/about' },
];
