import { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  staticDirs: ['../public'],
  addons: ['@storybook/addon-essentials'],
  stories: ['../src/**/__stories__/*.stories.tsx'],
  framework: {
    options: {},
    name: '@storybook/nextjs',
  },
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
}

export default config
