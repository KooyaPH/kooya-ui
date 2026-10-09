import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/")
          )
            return "react";
          if (id.includes("/@rc-component/")) return "ant";
          if (id.includes("/@ant-design/") || id.includes("/@emotion/"))
            return "ant";
          if (id.includes("/antd/")) return "ant";
        },
      },
    },
  },
  optimizeDeps: { exclude: ["@kooyaph/ui"] },
  server: {
    host: "127.0.0.1",
    port: 5190,
    strictPort: true,
    fs: { allow: ["../.."] },
  },
  preview: { host: "127.0.0.1", port: 5190, strictPort: true },
});
