'use client'

import { createContext } from 'react'

import Hls from 'hls.js'

const HlsContext = createContext<Hls | undefined>(undefined)

export default HlsContext
