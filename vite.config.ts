import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";
const _plugins = [
  react(),
  svgr({
    svgrOptions: {
      titleProp: true,
    },
  }),
];
export default defineConfig({
  plugins: _plugins,
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
});
