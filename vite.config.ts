import { resolve } from'path';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {},
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: [ 'cjs', 'es' ],
      name: 'interlinqed',
      fileName: (format) => `interlinqed.${format}.js`
    },
  },
});
