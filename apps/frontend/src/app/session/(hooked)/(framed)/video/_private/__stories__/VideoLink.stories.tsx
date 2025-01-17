import type { Meta, StoryObj } from '@storybook/react'

import VideoLink from '../VideoLink'

import { FocusableInitialization } from '@sendy/react-spatial'

const _VideoLink: typeof VideoLink = (props) => {
  return (
    <FocusableInitialization config={{}}>
      <VideoLink {...props} />
    </FocusableInitialization>
  )
}

const meta: Meta<typeof VideoLink> = {
  component: _VideoLink,
}

export default meta

type Story = StoryObj<typeof VideoLink>

export const VideoLinkStory: Story = {
  args: {
    id: 0,
    poster: '',
    title: 'Some title',
    date: new Date().getTime(),
  },
}
