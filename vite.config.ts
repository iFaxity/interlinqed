import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      all: true,
      reporter: [ 'lcov', 'text', 'text-summary' ],
      exclude: [ '**/*.spec.ts' ],
      include: [ 'src/*' ],
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: [ 'cjs', 'es' ],
      name: 'interlinqed',
      fileName: (format) => `index.${format}.js`,
    },
  },
});
