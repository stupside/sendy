import { PropsWithChildren } from 'react'

import type { Metadata, NextPage } from 'next'

import { Inter } from 'next/font/google'

import { FocusableInitialization } from '@sendy/ui-navigation'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sendy',
  description: 'Start streaming content to your devices',
}

const Layout: NextPage<PropsWithChildren> = async ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col h-screen max-w-screen text-zinc-200 bg-zinc-800`}
      >
        <FocusableInitialization>{children}</FocusableInitialization>
      </body>
    </html>
  )
}

export default Layout
