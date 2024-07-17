'use client'

import { createContext } from 'react'

import Hls from 'hls.js'

const HlsContext = createContext<{ instance?: Hls }>({
  instance: undefined,
})

export default HlsContext
