'use client'

import { type RefObject, createContext } from 'react'

import VideoAudioContext from './VideoAudioContext'
import VideoQualityContext from './VideoQualityContext'
import VideoSubtitleContext from './VideoSubtitleContext'

export interface IVideoContext {
  url: string
  video: RefObject<HTMLVideoElement>
  player: RefObject<HTMLDivElement>
}

export const VideoContext = createContext<IVideoContext>({} as IVideoContext)

export { VideoAudioContext, VideoQualityContext, VideoSubtitleContext }
