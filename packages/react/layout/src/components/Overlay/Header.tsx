'use client'

import type { FC, PropsWithChildren } from 'react'

const OverlayHeader: FC<PropsWithChildren> = ({ children }) => {
  if (children)
    return <header className="flex flex-row justify-end">{children}</header>

  return null
}

export default OverlayHeader
