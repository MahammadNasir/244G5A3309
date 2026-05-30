import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
    strictPort: true,
    proxy: {
      "/api/notifications": {
        target: "http://4.224.186.213",
        changeOrigin: true,
        rewrite: () => "/evaluation-service/notifications"
      }
    }
  },
  preview: {
    host: "localhost",
    port: 3000,
    strictPort: true
  }
});
