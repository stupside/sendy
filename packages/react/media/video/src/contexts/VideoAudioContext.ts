'use client'

import { createContext } from 'react'

interface IVideoAudioContext {
  audio: number
  change: (audio: number) => void
  audios: ReadonlySet<{ id: number; name: string }>
}

const VideoAudioContext = createContext<IVideoAudioContext>({
  audio: 0,
  change: () => {},
  audios: new Set(),
})

export type { IVideoAudioContext }

export default VideoAudioContext
