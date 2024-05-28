'use client'

import { createContext } from 'react'

import type Hls from 'hls.js'

export interface IVideoHlsContext {
  hls: Hls
}

export const VideoHlsContext = createContext<IVideoHlsContext>(
  {} as IVideoHlsContext,
)

export default VideoHlsContext
