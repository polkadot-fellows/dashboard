import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'build',
    rolldownOptions: {
      treeshake: {
        // `polkadot-api/sm-provider` imports an error class from `smoldot`,
        // which doesn't declare itself as side-effect free. Without this the
        // whole smoldot wasm (~3MB) gets bundled twice: once in its worker,
        // where it belongs, and once more next to the sm-provider.
        moduleSideEffects: [
          {
            test: /node_modules\/(@polkadot-api\/)?smoldot\//,
            sideEffects: false,
          },
        ],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
