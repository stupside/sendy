import { createContext } from 'react'

export interface IVideoAudioContext {
  audio: number
  audios: ReadonlySet<{ id: number; name: string }>
  changeAudio: (audio: number) => void
}

const VideoAudioContext = createContext<IVideoAudioContext>({
  audio: 0,
  audios: new Set(),
  changeAudio: () => {},
})

export default VideoAudioContext
