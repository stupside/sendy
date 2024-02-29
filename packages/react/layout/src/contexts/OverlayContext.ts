'use client'

import { createContext } from 'react'

interface IOverlayContext {
  visible: boolean
  show: () => void
  hide: () => void
}

const OverlayContext = createContext<IOverlayContext>({} as IOverlayContext)

export type { IOverlayContext }

export default OverlayContext
