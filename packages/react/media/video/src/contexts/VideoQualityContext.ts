'use client'

import { createContext } from 'react'

interface IVideoQualityContext {
  quality: number
  change: (quality?: number) => void
  qualities: ReadonlySet<{ id: number; name: string }>
}

const VideoQualityContext = createContext<IVideoQualityContext>({
  quality: 0,
  change: () => {},
  qualities: new Set(),
})

export type { IVideoQualityContext }

export default VideoQualityContext
