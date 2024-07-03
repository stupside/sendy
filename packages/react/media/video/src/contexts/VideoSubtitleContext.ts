'use client'

import { createContext } from 'react'

interface IVideoSubtitleContext {
  subtitle: number
  change: (subtitle?: number) => void
  subtitles: ReadonlySet<{ id: number; name: string }>
}

const VideoSubtitleContext = createContext<IVideoSubtitleContext>({
  subtitle: 0,
  change: () => {},
  subtitles: new Set(),
})

export type { IVideoSubtitleContext }

export default VideoSubtitleContext
