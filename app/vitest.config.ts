import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      coverage: {
        provider: 'v8',
        all: true,
        include: [
          'src/components/*.{ts,tsx}',
          'src/hooks/**/*.{ts,tsx}',
          'src/lib/**/*.{ts,tsx}',
        ],
        exclude: [
          'src/components/ui/**',
          'src/test/**',
        ],
        thresholds: {
          statements: 85,
          branches: 85,
          functions: 85,
          lines: 85,
        },
      },
    },
  })
);
