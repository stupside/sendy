import type { Meta, StoryObj } from '@storybook/react'

import Timer from '../../Code/Timer'

const meta: Meta<typeof Timer> = {
  component: Timer,
}

export default meta

type Story = StoryObj<typeof Timer>

export const TimeStory: Story = {
  args: {
    onTimeout: async () => {
      alert('timeout')
    },
    expiry: new Date().getTime() + 3 * 1000,
  },
}
