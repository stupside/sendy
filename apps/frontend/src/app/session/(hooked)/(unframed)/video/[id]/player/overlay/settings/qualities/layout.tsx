'use client'

import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { QualityProvider } from '@sendy/react-media-video-hls'

const Layout: NextPage<PropsWithChildren> = (props) => {
  return <QualityProvider>{props.children}</QualityProvider>
}

export default Layout
