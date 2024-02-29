//@ts-check

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

import analyze from 'rollup-plugin-analyzer'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import preserveDirectives from 'rollup-plugin-preserve-directives'

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      entryFileNames: '[name].mjs',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      dir: 'dist',
      format: 'cjs',
      preserveModules: true,
      entryFileNames: '[name].cjs',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    preserveDirectives(),
    peerDepsExternal({
      includeDependencies: true,
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript({
      sourceMap: true,
      tsconfig: './tsconfig.json',
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: /node_modules/,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    analyze({
      summaryOnly: true,
    }),
  ],
  watch: {
    include: 'src/**',
    clearScreen: false,
  },
  onwarn(warning, warn) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
    warn(warning)
  },
}
