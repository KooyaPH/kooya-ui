import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { mergeConfig } from 'vite';
import base from '../../apps/playground/vite.config';

// A separate immutable audit artifact avoids reviewing a live HMR target.
const root = fileURLToPath(new URL('../../', import.meta.url));
export default mergeConfig(base, {
  root: path.join(root, 'apps/playground'),
  build: {
    outDir: path.join(root, 'output/playwright/candidate/public'),
    emptyOutDir: true,
    rollupOptions: { input: {
      index: path.join(root, 'apps/playground/index.html'),
      audit: path.join(root, 'apps/playground/audit.html'),
    } },
  },
});
