'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { Provider } from '@/react/providers/Sse'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return <Provider src="/session/hook">{children}</Provider>
}

export default Layout
