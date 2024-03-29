import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import checker from "vite-plugin-checker"
// import eslint from "vite-plugin-eslint"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"
import mdx from "@mdx-js/rollup"

// https://vitejs.dev/config/
//
// NOTES:
// - `base` is configured in `package.json` with the vite --base flag. In local dev it is `/`,
//   whereas gh-pages always deploys to `/dashboard/`. Producution builds can also
//   be configureed with the `--base` flag.
// - `BASE_URL`env variable is used in the codebase to refer to the supplied base.
export default defineConfig({
  plugins: [
    { enforce: "pre", ...mdx() },
    // eslint(),
    react(),
    svgr(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  build: {
    outDir: "build",
  },
  server: {
    fs: {
      strict: true,
    },
  },
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
})
