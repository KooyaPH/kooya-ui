import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
export default defineConfig({
  plugins: [react()],
  root: resolve("packages/ui/tests"),
  build: {
    outDir: resolve("output/conformance-build"),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve("packages/ui/tests/conformance-fixture.html"),
    },
  },
  preview: { host: "127.0.0.1", port: 5207, strictPort: true },
});
