import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/primitives/*.tsx', 'src/components/*.tsx'],
  format: ['esm'], 
  dts: true,
  splitting: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  sourcemap: true,
  esbuildOptions(options) {
    options.jsx = 'automatic'
  }
})