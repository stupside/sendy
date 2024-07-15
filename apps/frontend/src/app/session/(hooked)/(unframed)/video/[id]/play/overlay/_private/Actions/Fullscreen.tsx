'use client'

import { FC } from 'react'

import { useVideoFullscreen } from '@sendy/react-media-video'

import Action from './Action'

const Fullscreen: FC = () => {
  const { toggle, enabled } = useVideoFullscreen()

  return (
    <Action title="Fullscreen" handle={toggle}>
      {enabled ? 'Windowed' : 'Fullscreen'}
    </Action>
  )
}

export default Fullscreen
