import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  build: {
    outDir: 'build',
  },
  // server: {  },
  plugins: [react(), viteTsconfigPaths(), svgr({ svgrOptions: { icon: true } })],
})
