'use client'

import type { FC, PropsWithChildren } from 'react'

import { FocusableBoundary } from '@sendy/react-spatial'

const OverlayBody: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FocusableBoundary>
      {({ ref }) => (
        <div
          ref={ref}
          className="relative flex flex-grow items-center justify-center"
        >
          {children}
        </div>
      )}
    </FocusableBoundary>
  )
}

export default OverlayBody
