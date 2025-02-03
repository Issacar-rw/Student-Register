import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Explicitly define environment variables
    'import.meta.env.VITE_CANISTER_ID_ST_REGISTION_BACKEND': 
      JSON.stringify('bkyz2-fmaaa-aaaaa-qaaaq-cai'),
    'import.meta.env.DFX_NETWORK': 
      JSON.stringify('local'),
    // Add a global polyfill
    global: 'globalThis',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4943',
        changeOrigin: true,
      },
    },
  },
});