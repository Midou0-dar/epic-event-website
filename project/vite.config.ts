import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from any IP address
    port: 4173, // You can change this to any port you prefer
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
