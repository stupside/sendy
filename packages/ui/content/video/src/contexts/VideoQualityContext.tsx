'use client'

import { createContext } from 'react'

export interface IVideoQualityContext {
  quality: number
  qualities: ReadonlySet<{ id: number; name: string }>
  changeQuality: (quality?: number) => void
}

const VideoQualityContext = createContext<IVideoQualityContext>({
  quality: 0,
  qualities: new Set(),
  changeQuality: () => {},
})

export default VideoQualityContext
