'use client'

import { ReactNode, type FC } from 'react'

import { useFocusable } from '@sendy/react-spatial'
import { useVideoTimeline } from '@sendy/react-media-video'

const Play: FC<{
  icons: {
    paused: ReactNode
    resumed: ReactNode
  }
}> = (props) => {
  const { ref, focused } = useFocusable({})

  const { paused, play, pause } = useVideoTimeline()

  return (
    <button
      ref={ref}
      title="play"
      type="button"
      onClick={paused ? play : pause}
      className={`rounded-full drop-shadow-2xl ${focused ? 'bg-white text-black' : 'bg-zinc-700 text-white hover:bg-white hover:text-black focus:bg-white focus:text-black'}`}
    >
      {paused ? props.icons.paused : props.icons.resumed}
    </button>
  )
}

export default Play
