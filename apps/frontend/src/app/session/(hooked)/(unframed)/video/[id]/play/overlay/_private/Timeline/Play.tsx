'use client'

import { type FC } from 'react'

import { PlayIcon } from '@heroicons/react/24/solid'
import { PauseIcon } from '@heroicons/react/24/solid'

import { useFocusable } from '@sendy/react-spatial'
import { useVideoTimeline } from '@sendy/react-media-video'

const PlayButtonIcon = () => <PlayIcon className="h-6 w-6 m-3" />
const PauseButtonIcon = () => <PauseIcon className="h-6 w-6 m-3" />

const Play: FC = () => {
  const { ref } = useFocusable({})

  const { paused, play, pause } = useVideoTimeline()

  return (
    <button
      ref={ref}
      title="play"
      type="button"
      onClick={paused ? play : pause}
      className="bg-zinc-700 hover:bg-zinc-200 hover:text-black focus:bg-zinc-200 focus:text-black rounded-full"
    >
      {paused ? <PlayButtonIcon /> : <PauseButtonIcon />}
    </button>
  )
}

export default Play
