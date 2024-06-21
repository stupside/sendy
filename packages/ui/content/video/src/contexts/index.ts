'use client'

import { type RefObject, createContext, createRef } from 'react'

import VideoAudioContext from './VideoAudioContext'
import VideoQualityContext from './VideoQualityContext'
import VideoSubtitleContext from './VideoSubtitleContext'

interface IVideoContext {
  url: string
  video: RefObject<HTMLVideoElement>
  player: RefObject<HTMLDivElement>
}

const VideoContext = createContext<IVideoContext>({
  url: 'unknown',
  player: createRef<HTMLDivElement>(),
  video: createRef<HTMLVideoElement>(),
})

export type { IVideoContext }

export {
  VideoContext,
  VideoAudioContext,
  VideoQualityContext,
  VideoSubtitleContext,
}
