'use client'

import { createContext } from 'react'

import type Hls from 'hls.js'

interface IHlsContext {
  hls: Hls
}

const HlsContext = createContext<IHlsContext>({} as IHlsContext)

export type { IHlsContext as IHlsContext }

export default HlsContext
