'use client'

import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { LanguageAudioProvider } from '@sendy/react-media-video-hls'

const Layout: NextPage<PropsWithChildren<{ params: { id: number } }>> = (
  props,
) => {
  return <LanguageAudioProvider>{props.children}</LanguageAudioProvider>
}

export default Layout
