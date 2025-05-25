// frontend_react/vite.config.ts
/*import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      // toute requête /ask -> backend:8000
      "/ask": {
        target: "http://backend:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
*/


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      // dès qu’on appelle /ask_stream sur le dev-server, on le redirige vers le back
      '/ask_stream': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/ask': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
