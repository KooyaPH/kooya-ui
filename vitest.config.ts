import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["packages/ui/tests/setup.ts"],
    include: ["packages/ui/tests/**/*.test.tsx"],
  },
});
