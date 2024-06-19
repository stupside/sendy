'use client'

import { createContext } from 'react'

interface IVideoSubtitleContext {
  subtitle: number
  subtitles: ReadonlySet<{ id: number; name: string }>
  changeSubtitle: (subtitle?: number) => void
}

const VideoSubtitleContext = createContext<IVideoSubtitleContext>({
  subtitle: 0,
  subtitles: new Set(),
  changeSubtitle: () => {},
})

export type { IVideoSubtitleContext }

export default VideoSubtitleContext
