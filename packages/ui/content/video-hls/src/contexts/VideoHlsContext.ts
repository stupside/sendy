'use client'

import { createContext } from 'react'

import type Hls from 'hls.js'

interface IVideoHlsContext {
  hls: Hls
}

const VideoHlsContext = createContext<IVideoHlsContext>({} as IVideoHlsContext)

export type { IVideoHlsContext }

export default VideoHlsContext
