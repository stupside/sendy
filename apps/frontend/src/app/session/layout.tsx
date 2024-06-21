'use client'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { FocusableBoundary } from '@sendy/ui-navigation'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <FocusableBoundary focus lock>
      {({ ref }) => (
        <main ref={ref} className="flex flex-col h-full">
          {children}
        </main>
      )}
    </FocusableBoundary>
  )
}

export default Layout
