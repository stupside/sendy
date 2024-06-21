'use server'

import { NextPage } from 'next'

import { FC, PropsWithChildren } from 'react'

import * as Hls from '@sendy/ui-content-video-hls'

import { VideoProvider } from '@sendy/ui-content-video'

import { MakeReq } from '@/tools/api'

import Overlay from './_private/Overlay'

const VideoController: FC<PropsWithChildren<{ type: string }>> = (props) => {
  switch (props.type) {
    case 'm3u8': {
      return <Hls.HlsProvider config={{}}>{props.children}</Hls.HlsProvider>
    }
    default:
      return props.children
  }
}

const Page: NextPage<
  PropsWithChildren<{
    params: { id: number }
  }>
> = async (props) => {
  const { data } = await MakeReq((c) =>
    c.GET('/contents/{id}', {
      params: {
        path: {
          id: props.params.id,
        },
      },
    }),
  )

  if (data === undefined) {
    return <Overlay>Failed to fetch data</Overlay>
  }

  return (
    <Overlay>
      <VideoProvider url={data.value}>
        <VideoController type={data.subtype}>{props.children}</VideoController>
      </VideoProvider>
    </Overlay>
  )
}

export default Page
