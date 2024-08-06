import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  externals: {
    '@babel/runtime/regenerator': 'commonjs2 @babel/runtime/regenerator'
  }
})
