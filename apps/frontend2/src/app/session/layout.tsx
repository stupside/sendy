'use client'

import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import Sse from '@/ui/providers/Sse'
import { FocusableBoundary } from '@sendy/ui-navigation'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Sse src="sse">
      <header className="flex justify-between items-center px-5 py-3">
        <h1 className="font-bold text-3xl">Sendy</h1>
        <Sse.Status />
      </header>
      <FocusableBoundary focus lock>
        {({ ref }) => (
          <main
            ref={ref}
            className="flex flex-col flex-grow overflow-x-hidden px-5 pb-5"
          >
            {children}
          </main>
        )}
      </FocusableBoundary>
    </Sse>
  )
}

export default Layout
