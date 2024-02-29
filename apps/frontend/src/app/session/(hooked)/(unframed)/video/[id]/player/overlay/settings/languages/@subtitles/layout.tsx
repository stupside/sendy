'use client'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { LanguageSubtitleProvider } from '@sendy/react-media-video-hls'

const Layout: NextPage<PropsWithChildren> = (props) => {
  return <LanguageSubtitleProvider>{props.children}</LanguageSubtitleProvider>
}

export default Layout
