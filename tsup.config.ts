import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  bundle: true,
  splitting: false,
  outDir: 'dist',
  platform: 'node',
  target: 'node18', // Better for modern compatibility
  noExternal: ['.'],
  esbuildOptions(options) {
    options.outExtension = {
      '.js': options.format === 'esm' ? '.mjs' : '.cjs',
    };
  }
});
