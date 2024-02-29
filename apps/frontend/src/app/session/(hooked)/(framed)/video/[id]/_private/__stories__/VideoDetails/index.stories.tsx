import type { Meta, StoryObj } from '@storybook/react'

import VideoDetails from '../../VideoDetails'

import { FocusableInitialization } from '@sendy/react-spatial'

const _VideoDetails: typeof VideoDetails = (props) => {
  return (
    <FocusableInitialization config={{}}>
      <VideoDetails {...props} />
    </FocusableInitialization>
  )
}

const meta: Meta<typeof VideoDetails> = {
  component: _VideoDetails,
}

export default meta

type Story = StoryObj<typeof VideoDetails>

export const VideoDetailsStory: Story = {
  args: {
    id: 1029955,
    duration: '2h 44m',
    title: 'Kinds of Kindness',
    backdrop:
      'https://image.tmdb.org/t/p/original/xTqHr4qhqm6J7vIn6x7GlQArqhk.jpg',
    overview:
      'Une fable en tryptique qui suit : un homme sans choix qui tente de prendre le contrôle de sa propre vie ; un policier inquiet parce que sa femme disparue en mer est de retour et qu’elle semble une personne différente ; et une femme déterminée à trouver une personne bien précise dotée d’un pouvoir spécial, destinée à devenir un chef spirituel prodigieux.',
    credits: {
      dep1: [
        {
          name: 'name1',
          character: 'char1',
        },
        {
          name: 'name2',
          character: 'char2',
        },
      ],
      dep2: [
        {
          name: 'name3',
          character: 'char3',
        },
        {
          name: 'name4',
          character: 'char4',
        },
      ],
    },
  },
}
