import { chromium, defineConfig } from '@playwright/test';
import path from 'node:path';

// An assignment runs one item at a time. Engine projects are serial to bound RAM.
export default defineConfig({
  testDir: './tests', fullyParallel: false, workers: 1, retries: 0,
  timeout: 60_000, expect: { timeout: 10_000 },
  outputDir: '../../output/playwright/audit-tests',
  reporter: [['line'], ['json', { outputFile: path.resolve('output/playwright/audit-results.json') }]],
  use: {
    baseURL: process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:5300',
    viewport: { width: 1280, height: 900 }, trace: 'retain-on-failure',
    screenshot: 'only-on-failure', video: 'off',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', launchOptions: { executablePath: process.env.AUDIT_CHROMIUM_PATH ?? chromium.executablePath() } } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
