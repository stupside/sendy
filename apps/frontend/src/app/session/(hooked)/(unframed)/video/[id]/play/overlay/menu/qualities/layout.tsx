'use server'

import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { QualityProvider } from '@sendy/react-media-video-hls'

const Layout: NextPage<PropsWithChildren> = async (props) => {
  return <QualityProvider>{props.children}</QualityProvider>
}

export default Layout
