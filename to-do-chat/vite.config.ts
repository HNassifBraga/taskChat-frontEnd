import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

const BACKEND_URL = 'https://taskchat-backend-4.onrender.com'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      // Chamadas HTTP: /api/login -> backend /login (remove o prefixo /api)
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // WebSocket do Socket.IO (chat em tempo real)
      '/socket.io': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: true,
        ws: true,
      },
    },
  },
})
