import type { Meta, StoryObj } from '@storybook/react'

import CodeExpiry from '../CodeExpiry'

const meta: Meta<typeof CodeExpiry> = {
  component: CodeExpiry,
}

export default meta

type Story = StoryObj<typeof CodeExpiry>

export const CodeStory: Story = {
  args: {
    refresh: async () => {
      console.log('Expired')
    },
    expiry: new Date().getTime() + 3 * 1000,
  },
}
