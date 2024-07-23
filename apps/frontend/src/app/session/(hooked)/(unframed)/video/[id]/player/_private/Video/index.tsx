'use client'

import { FC, PropsWithChildren } from 'react'

import { VideoProvider } from '@sendy/react-media-video'

const Video: FC<
  PropsWithChildren<{
    url: string
    title: string
    subtitle: string
  }>
> = (props) => {
  return (
    <VideoProvider
      url={props.url}
      title={props.title}
      subtitle={props.subtitle}
    >
      {props.children}
    </VideoProvider>
  )
}

export default Video
