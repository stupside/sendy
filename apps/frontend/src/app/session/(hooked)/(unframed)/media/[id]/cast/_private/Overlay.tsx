'use client'

import { FC, PropsWithChildren } from 'react'

const Overlay: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed m-auto aspect-video w- inset-0 z-10">{children}</div>
  )
}

export default Overlay
