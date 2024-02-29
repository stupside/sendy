'use client'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { FocusContext, useFocusable } from '@sendy/react-spatial'

const Layout: NextPage<
  PropsWithChildren<{
    params: Promise<{
      id: number
    }>
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
        className="absolute inset-0 flex flex-col px-16 py-12 bg-gradient-to-r from-black/90 via-black/65 to-black/90"
      >
        <div className="mx-5">{props.children}</div>
      </div>
    </FocusContext.Provider>
  )
}

export default Layout
