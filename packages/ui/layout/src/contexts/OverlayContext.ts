'use client'

import { createContext } from 'react'

export interface IOverlayContext {
  visible: boolean
  show: () => void
  hide: () => void
}

const OverlayContext = createContext<IOverlayContext>({} as IOverlayContext)

export default OverlayContext
