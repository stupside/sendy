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

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <FocusableInitialization>
        <body
          className={`${inter.className} h-screen max-w-screen text-white bg-zinc-800`}
        >
          {children}
        </body>
      </FocusableInitialization>
    </html>
  )
}

export default Layout
