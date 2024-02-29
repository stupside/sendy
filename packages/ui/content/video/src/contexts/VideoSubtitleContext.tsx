import { createContext } from 'react'

export interface IVideoSubtitleContext {
  subtitle: number
  subtitles: ReadonlySet<{ id: number; name: string }>
  changeSubtitle: (subtitle?: number) => void
}

const VideoSubtitleContext = createContext<IVideoSubtitleContext>({
  subtitle: 0,
  subtitles: new Set(),
  changeSubtitle: () => {},
})

export default VideoSubtitleContext
