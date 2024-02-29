'use client'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import Timeline from './_private/Timeline'

import { FocusContext, useFocusable } from '@sendy/react-spatial'

import { ProviderStatus } from '@/react/providers/Sse'

const Layout: NextPage<PropsWithChildren> = (props) => {
  const { ref, focusKey } = useFocusable({
    forceFocus: true,
    isFocusBoundary: true,
  })

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className="absolute inset-0 flex flex-col px-16 py-12 bg-gradient-to-b from-black/90 via-black/65 to-black/90"
      >
        <header className="flex justify-end">
          <ProviderStatus />
        </header>
        <div className="flex flex-col flex-grow">{props.children}</div>
        <footer>
          <Timeline />
        </footer>
      </div>
    </FocusContext.Provider>
  )
}

export default Layout
