import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
export default defineConfig({
  plugins: [react()],
  root: resolve("packages/ui/tests"),
  server: { host: "127.0.0.1", port: 5194, strictPort: true },
});
