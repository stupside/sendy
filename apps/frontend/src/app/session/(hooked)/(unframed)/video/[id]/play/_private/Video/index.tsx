'use client'

import { FC, PropsWithChildren } from 'react'

import { VideoProvider } from '@sendy/react-media-video'

import Controller from './Controller'

const Video: FC<PropsWithChildren<{ url: string; subtype: string }>> = (
  props,
) => {
  return (
    <VideoProvider url={props.url}>
      <Controller type={props.subtype}>{props.children}</Controller>
    </VideoProvider>
  )
}

export default Video
