'use client'

import { FC } from 'react'

import { useVideoPip } from '@sendy/react-media-video'

import Action from './Action'

const PictureInPicture: FC = () => {
  const { toggle } = useVideoPip()

  return (
    <Action title="Picture in Picture" handle={toggle}>
      Picture in Picture
    </Action>
  )
}

export default PictureInPicture
