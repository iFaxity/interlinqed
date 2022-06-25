import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: [ 'lcov', 'text' ],
      exclude: [ '**/*.spec.ts' ],
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: [ 'cjs', 'es' ],
      name: 'interlinqed',
      fileName: (format) => `interlinqed.${format}.js`
    },
  },
});
