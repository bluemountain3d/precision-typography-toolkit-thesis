import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier/recommended';
import jsxA11y from 'eslint-plugin-jsx-a11y'; // Din import finns redan här!

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: ['SHY', 'cleanText', 'useFontMetrics'],
        },
      ],
      'react/prop-types': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
  {
    files: ['**/*.types.ts', 'src/hooks/**/*.ts', '**/MetricTableColumns.tsx'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['src/components/ui/Image/Image.tsx'],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: ['src/pages/learning/**/*.tsx', 'src/pages/tools/**/*.tsx'],
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    files: ['scripts/**/*.js', 'scripts/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  prettier,
];
