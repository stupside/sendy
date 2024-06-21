'use client'

import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { FocusableBoundary } from '@sendy/ui-navigation'

import { Provider, ProviderStatus } from '@/react/providers/Sse'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Provider src="/session/hook">
      <header className="sticky flex justify-between items-center px-5 py-3">
        <h1 className="font-bold text-3xl">Sendy</h1>
        <ProviderStatus />
      </header>
      {children}
    </Provider>
  )
}

export default Layout
