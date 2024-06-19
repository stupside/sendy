'use client'

import { type RefObject, createContext, createRef } from 'react'

import VideoAudioContext from './VideoAudioContext'
import VideoQualityContext from './VideoQualityContext'
import VideoSubtitleContext from './VideoSubtitleContext'

type IVideoContext = {
  url: string
  video: RefObject<HTMLVideoElement>
  player: RefObject<HTMLDivElement>
}

export const VideoContext = createContext<IVideoContext>({
  url: 'unknown',
  player: createRef<HTMLDivElement>(),
  video: createRef<HTMLVideoElement>(),
})

export type { IVideoContext }

export { VideoAudioContext, VideoQualityContext, VideoSubtitleContext }
