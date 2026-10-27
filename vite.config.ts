import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    pool: 'threads',
    fileParallelism: false,
    isolate: false,
    maxWorkers: 1,
    coverage: {
      provider: 'v8',
      include: ['src/App.tsx', 'src/products.ts'],
      reporter: ['text', 'lcov'],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
})
