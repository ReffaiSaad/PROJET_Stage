import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet d'accéder au serveur depuis le réseau local
    port: 5173, // Nouveau port pour le frontend
    proxy: {
      // Redirige les requêtes /ask_stream vers le backend
      '/ask_stream': {
        target: 'http://localhost:8000', // URL du backend
        changeOrigin: true, // Change l'origine de l'hôte pour correspondre au backend
        secure: false, // Désactive la vérification SSL (utile pour le développement)
      },
      // Redirige les requêtes /ask vers le backend
      '/ask': {
        target: 'http://localhost:8000', // URL du backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})