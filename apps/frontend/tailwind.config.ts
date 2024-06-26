import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/react/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@sendy/**/*.{ts,tsx,mjs,cjs}',
  ],
  theme: {},
  plugins: [],
}
export default config
