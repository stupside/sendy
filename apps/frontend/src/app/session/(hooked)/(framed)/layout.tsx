'use client'

import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { ProviderStatus } from '@/react/providers/Sse'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="sticky flex justify-between items-center px-5 py-3">
        <h1 className="font-bold text-3xl">Sendy</h1>
        <ProviderStatus />
      </header>
      {children}
    </>
  )
}

export default Layout
