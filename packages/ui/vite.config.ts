import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: "src/index.ts",
        antd: "src/antd.tsx",
        foundations: "src/foundations/index.ts",
        atoms: "src/atoms/index.ts",
        molecules: "src/molecules/index.ts",
        organisms: "src/organisms/index.ts",
        templates: "src/templates/index.ts",
        themes: "src/foundations/themes.ts",
        "themes/mosaic": "src/foundations/themes/mosaic.ts",
        "themes/signature": "src/foundations/themes/signature.ts",
        "themes/canvas": "src/foundations/themes/canvas.ts",
        "themes/client": "src/foundations/themes/client.ts",
      },
      formats: ["es"],
      fileName: (_format, name) => name + ".js",
    },
    rollupOptions: {
      external: (id) => /^(react|react-dom|antd)(\/|$)/.test(id),
    },
  },
});
