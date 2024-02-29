import { Inter } from 'next/font/google'

import { PropsWithChildren } from 'react'

import './globals.css'
import type { Metadata, NextPage, Viewport } from 'next'

import { FocusableInitialization } from '@sendy/react-spatial'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sendy',
  description: 'Start streaming content to your devices',
}

export const viewport: Viewport = {
  initialScale: 1.0,
  colorScheme: 'dark',
  width: 'device-width',
}

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen max-w-screen text-white bg-zinc-800`}
      >
        <FocusableInitialization config={{}}>
          {children}
        </FocusableInitialization>
      </body>
    </html>
  )
}

export default Layout
