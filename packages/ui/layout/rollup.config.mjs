import terser from '@rollup/plugin-terser'

import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

import peers from 'rollup-plugin-peer-deps-external'

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].mjs',
      plugins: [
        terser({
          mangle: true,
          compress: true,
          format: {
            beautify: true,
            comments: 'some',
          },
        }),
      ],
    },
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      plugins: [
        terser({
          mangle: true,
          compress: true,
          format: {
            beautify: true,
            comments: 'some',
          },
        }),
      ],
    },
  ],
  plugins: [
    peers({
      includeDependencies: true,
    }),
    resolve(),
    commonjs(),
    typescript(),
  ],
}
