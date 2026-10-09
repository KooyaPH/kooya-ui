import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
export default defineConfig({
  plugins: [react()],
  root: resolve("packages/ui/tests"),
  build: {
    outDir: resolve("output/composite-affordance-build"),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve("packages/ui/tests/composite-affordance-fixture.html"),
    },
  },
  preview: { host: "127.0.0.1", port: 5221, strictPort: true },
});
