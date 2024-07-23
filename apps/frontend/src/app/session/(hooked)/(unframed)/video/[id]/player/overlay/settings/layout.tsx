'use client'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { FocusContext, useFocusable } from '@sendy/react-spatial'

const Layout: NextPage<
  PropsWithChildren<{
    params: {
      id: number
    }
  }>
> = (props) => {
  const { ref, focusKey } = useFocusable({
    forceFocus: true,
    isFocusBoundary: true,
  })

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className="fixed inset-0 bg-gradient-to-r flex justify-end items-center from-black/50 via-black/75 to-black/95 pr-8"
      >
        <div className="mx-5">{props.children}</div>
      </div>
    </FocusContext.Provider>
  )
}

export default Layout
