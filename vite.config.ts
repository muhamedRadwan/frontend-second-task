import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
      '@context': resolve(__dirname, './src/context'),
      '@types': resolve(__dirname, './src/types'),
      '@styles': resolve(__dirname, './src/styles'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
});
