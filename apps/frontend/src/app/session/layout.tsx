'use client'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { useFocusable } from '@sendy/react-spatial'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const { ref } = useFocusable({
    isFocusBoundary: true,
  })

  return (
    <main ref={ref} className="flex flex-col h-full">
      {children}
    </main>
  )
}

export default Layout
