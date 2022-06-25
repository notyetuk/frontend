import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const mode = 'production';

export default defineConfig({
  // root: mode === 'production' ? './build' : '',
  build: {
    outDir: 'build',
  },
  plugins: [react()],
});
