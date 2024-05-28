import terser from '@rollup/plugin-terser'

import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

import peers from 'rollup-plugin-peer-deps-external'
import directives from 'rollup-plugin-preserve-directives'

export default {
  watch: true,
  input: 'src/index.ts',
  onwarn: (warning, warn) => {
    if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
      warn(warning)
    }
  },
  output: [
    {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      entryFileNames: '[name].mjs',
      plugins: [
        terser({
          mangle: true,
          compress: true,
          format: {
            beautify: false,
          },
        }),
      ],
    },
    {
      dir: 'dist',
      format: 'cjs',
      preserveModules: true,
      entryFileNames: '[name].cjs',
      plugins: [
        terser({
          mangle: true,
          compress: true,
          format: {
            beautify: false,
          },
        }),
      ],
    },
  ],
  plugins: [
    directives({}),
    peers({
      includeDependencies: true,
    }),
    resolve(),
    commonjs(),
    typescript(),
  ],
}
