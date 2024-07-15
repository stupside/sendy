'use client'

import type { FC, PropsWithChildren } from 'react'

import { FocusContext, useFocusable } from '@sendy/react-spatial'

const OverlayFooter: FC<PropsWithChildren> = ({ children }) => {
  const { ref, focusKey } = useFocusable({
    isFocusBoundary: true,
  })
  return (
    <FocusContext.Provider value={focusKey}>
      <footer ref={ref} className="flex flex-row justify-center gap-x-6">
        {children}
      </footer>
    </FocusContext.Provider>
  )
}

export default OverlayFooter
