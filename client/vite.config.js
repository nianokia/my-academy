import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all .env variables from the current working directory and environment (dev or prod)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      outDir: 'dist'
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_DOMAIN,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
