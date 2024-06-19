'use client'

import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { Provider } from '@/react/providers/Sse'
import { FocusableBoundary } from '@sendy/ui-navigation'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Provider src="sse">
      <FocusableBoundary lock>
        {({ ref }) => (
          <main ref={ref} className="flex flex-col h-full">
            {children}
          </main>
        )}
      </FocusableBoundary>
    </Provider>
  )
}

export default Layout
