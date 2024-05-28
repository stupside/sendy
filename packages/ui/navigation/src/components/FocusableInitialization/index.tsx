'use client'

import { type FC, type PropsWithChildren, useLayoutEffect } from 'react'

import { initFocusables } from 'src/hooks'

const FocusableInitialization: FC<PropsWithChildren> = ({ children }) => {
  useLayoutEffect(() => {
    initFocusables()
  }, [initFocusables])

  return <>{children}</>
}

export default FocusableInitialization
