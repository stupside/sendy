'use client'

import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { LanguageSubtitleProvider } from '@sendy/react-media-video-hls'

const Layout: NextPage<PropsWithChildren<{ params: { id: number } }>> = (
  props,
) => {
  return <LanguageSubtitleProvider>{props.children}</LanguageSubtitleProvider>
}

export default Layout
