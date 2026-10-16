import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: { exclude: ["@kooyaph/ui"] },
  server: {
    host: "127.0.0.1",
    port: 5194,
    strictPort: true,
    fs: { allow: ["../.."] },
  },
  preview: { host: "127.0.0.1", port: 5193, strictPort: true },
});
