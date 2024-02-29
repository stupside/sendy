import type { Meta, StoryObj } from '@storybook/react'

import Code from '../Code'

const meta: Meta<typeof Code> = {
  component: Code,
}

export default meta

type Story = StoryObj<typeof Code>

export const CodeStory: Story = {
  args: {
    raw: '0A1B2C',
  },
}
