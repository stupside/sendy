'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { MakeReq } from '@/tools/api'
import { getMockedVideo } from '@/tools/mock'

import {
  QualityProvider,
  LanguageAudioProvider,
  LanguageSubtitleProvider,
} from '@sendy/ui-content-video-hls'

import Overlay, { type VideoFeatures } from './_private/Overlay'

const features: Record<string, VideoFeatures> = {
  m3u8: {
    qualities: QualityProvider,
    audios: LanguageAudioProvider,
    subtitles: LanguageSubtitleProvider,
  },
}

const Layout: NextPage<PropsWithChildren<{ params: { id: number } }>> = async (
  props,
) => {
  const { data = await getMockedVideo() } = await MakeReq((c) =>
    c.GET('/contents/{id}', {
      params: {
        path: {
          id: props.params.id,
        },
      },
    }),
  )

  if (data === undefined) throw new Error('Could not fetch data')

  return <Overlay {...features[data.subtype]}>{props.children}</Overlay>
}

export default Layout
