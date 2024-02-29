'use client'

import { FC } from 'react'

import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline'

import Action from './Actions/Action'

import { useVideoFullscreen } from '@sendy/react-media-video'

const Fullscreen: FC = () => {
  const { toggle, enabled } = useVideoFullscreen()

  return (
    <Action title="Fullscreen" handle={toggle}>
      {enabled ? (
        <ArrowsPointingInIcon className="w-5 h-5" />
      ) : (
        <ArrowsPointingOutIcon className="w-5 h-5" />
      )}
    </Action>
  )
}

export default Fullscreen
