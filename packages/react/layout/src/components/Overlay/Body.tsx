'use client'

import type { FC, PropsWithChildren } from 'react'

import { FocusContext, useFocusable } from '@sendy/react-spatial'

const OverlayBody: FC<PropsWithChildren> = ({ children }) => {
  const { ref, focusKey } = useFocusable({})

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className="relative flex flex-grow items-center justify-center"
      >
        {children}
      </div>
    </FocusContext.Provider>
  )
}

export default OverlayBody
