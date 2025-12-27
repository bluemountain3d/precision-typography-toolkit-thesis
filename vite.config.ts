import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(__dirname, './src/components'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@models': path.resolve(__dirname, './src/models'),
      '@types': path.resolve(__dirname, './src/types'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@services': path.resolve(__dirname, './src/services'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
});
