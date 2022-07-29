import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const mode = 'production';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [react()],
});
