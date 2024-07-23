'use client'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { LanguageAudioProvider } from '@sendy/react-media-video-hls'

const Layout: NextPage<PropsWithChildren> = (props) => {
  return <LanguageAudioProvider>{props.children}</LanguageAudioProvider>
}

export default Layout
