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
        label: 'Font Metrics and Web Typography',
        path: '/learn/font-metrics-article',
      },
    ],
  },
  { label: 'About', path: '/about' },
];
