'use client'

import { FC } from 'react'

import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline'

import { useVideoFullscreen } from '@sendy/react-media-video'

import Action from './Action'

const Fullscreen: FC = () => {
  const { toggle, enabled } = useVideoFullscreen()

  return (
    <Action title="Fullscreen" handle={toggle}>
      {enabled ? (
        <ArrowsPointingInIcon className="w-6 h-6" />
      ) : (
        <ArrowsPointingOutIcon className="w-6 h-6" />
      )}
    </Action>
  )
}

export default Fullscreen
