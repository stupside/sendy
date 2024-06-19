'use client'

import { createContext } from 'react'

interface IVideoAudioContext {
  audio: number
  audios: ReadonlySet<{ id: number; name: string }>
  changeAudio: (audio: number) => void
}

const VideoAudioContext = createContext<IVideoAudioContext>({
  audio: 0,
  audios: new Set(),
  changeAudio: () => {},
})

export type { IVideoAudioContext }

export default VideoAudioContext
