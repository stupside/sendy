import type { Meta, StoryObj } from '@storybook/react'

import Value from '../../Code/Value'

const meta: Meta<typeof Value> = {
  component: Value,
}

export default meta

type Story = StoryObj<typeof Value>

export const ValueStory: Story = {
  args: {
    raw: '0A1B2C',
  },
}
