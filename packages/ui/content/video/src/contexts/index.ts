'use client'

import { createContext, createRef, type RefObject } from 'react'

import VideoAudioContext from './VideoAudioContext'
import VideoQualityContext from './VideoQualityContext'
import VideoSubtitleContext from './VideoSubtitleContext'

interface IVideoContext {
  url: string
  ref: RefObject<HTMLVideoElement>
  player: RefObject<HTMLDivElement>
}

const VideoContext = createContext<IVideoContext>({
  url: 'unknown',
  ref: createRef(),
  player: createRef(),
})

export type { IVideoContext }

export {
  VideoContext,
  VideoAudioContext,
  VideoQualityContext,
  VideoSubtitleContext,
}
