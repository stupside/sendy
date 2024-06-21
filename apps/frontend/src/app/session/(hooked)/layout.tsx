'use client'

import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { Provider } from '@/react/providers/Sse'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return <Provider src="/session/hook">{children}</Provider>
}

export default Layout
