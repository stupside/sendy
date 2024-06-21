'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { MakeReq } from '@/tools/api'

import * as Hls from '@sendy/ui-content-video-hls'

import Overlay, { type VideoFeatures } from './_private/Overlay'

const features: Record<string, VideoFeatures> = {
  m3u8: {
    qualities: Hls.QualityProvider,
    audios: Hls.LanguageAudioProvider,
    subtitles: Hls.LanguageSubtitleProvider,
  },
}

const Layout: NextPage<PropsWithChildren<{ params: { id: number } }>> = async (
  props,
) => {
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
    return <div>Failed to fetch data</div>
  }

  return <Overlay {...features[data.subtype]}>{props.children}</Overlay>
}

export default Layout
