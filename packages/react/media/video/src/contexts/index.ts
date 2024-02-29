'use client'

import { createContext, createRef, type RefObject } from 'react'

export { default as VideoAudioContext } from './VideoAudioContext'
export { default as VideoQualityContext } from './VideoQualityContext'
export { default as VideoSubtitleContext } from './VideoSubtitleContext'

interface IVideoContext {
  url: string
  title: string
  subtitle: string
  ref: RefObject<HTMLVideoElement>
  player: RefObject<HTMLDivElement>
}

const VideoContext = createContext<IVideoContext>({
  url: 'unknown',
  title: 'unknown',
  subtitle: 'unknown',
  ref: createRef(),
  player: createRef(),
})

export type { IVideoContext }

export { VideoContext }
