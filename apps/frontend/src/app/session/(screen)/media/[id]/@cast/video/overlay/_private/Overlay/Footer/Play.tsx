'use client'

import { type FC } from 'react'

import { PlayIcon } from '@heroicons/react/24/solid'
import { PauseIcon } from '@heroicons/react/24/solid'

import { Focusable } from '@sendy/ui-navigation'
import { useVideoTimeline } from '@sendy/ui-content-video'

const PlayButtonIcon = () => <PlayIcon className="h-8 w-8 m-3" />
const PauseButtonIcon = () => <PauseIcon className="h-8 w-8 m-3" />

const Play: FC = () => {
  const { paused, play, pause } = useVideoTimeline()

  return (
    <Focusable>
      {({ ref }) => (
        <button
          ref={ref}
          title="play"
          type="button"
          id="play"
          onClick={paused ? play : pause}
          className="bg-zinc-700 hover:bg-zinc-200 hover:text-black focus:bg-zinc-200 focus:text-black rounded-full"
        >
          {paused ? <PlayButtonIcon /> : <PauseButtonIcon />}
        </button>
      )}
    </Focusable>
  )
}

export default Play
