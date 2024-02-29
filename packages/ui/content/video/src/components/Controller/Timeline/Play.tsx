import { type FC, useCallback, useEffect, useState } from 'react'

import { PlayIcon } from '@heroicons/react/24/solid'
import { PauseIcon } from '@heroicons/react/24/solid'

import { Focusable } from '@sendy/ui-navigation'

import { useVideo } from 'src/hooks'

const Play: FC = () => {
  const { video } = useVideo()

  const [paused, setPaused] = useState(true)

  useEffect(() => {
    const { current } = video

    const onPause = () => {
      setPaused(true)
    }

    const onPlay = () => {
      setPaused(false)
    }

    setPaused(current?.paused ?? true)

    current?.addEventListener('play', onPlay)
    current?.addEventListener('pause', onPause)

    return () => {
      current?.removeEventListener('play', onPlay)
      current?.removeEventListener('pause', onPause)
    }
  }, [video.current])

  const togglePaused = useCallback(() => {
    if (video.current?.paused) {
      video?.current?.play()
    } else {
      video?.current?.pause()
    }
  }, [video.current])

  return (
    <Focusable>
      {({ ref }) => (
        <button
          ref={ref}
          title="play"
          type="button"
          id="play"
          onClick={togglePaused}
          className="bg-zinc-700 hover:bg-zinc-200 hover:text-black focus:bg-zinc-200 focus:text-black rounded-full"
        >
          {paused ? <PlayButtonIcon /> : <PauseButtonIcon />}
        </button>
      )}
    </Focusable>
  )
}

const PlayButtonIcon = () => <PlayIcon className="h-8 w-8 m-3" />
const PauseButtonIcon = () => <PauseIcon className="h-8 w-8 m-3" />

export default Play
