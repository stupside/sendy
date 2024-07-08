'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { sendy } from '@/tools/api'

import {
  QualityProvider,
  LanguageAudioProvider,
  LanguageSubtitleProvider,
} from '@sendy/react-media-video-hls'

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
  const { data } = await sendy((c) =>
    c.GET('/medias/{id}', {
      params: {
        path: {
          id: props.params.id,
        },
      },
    }),
  )

  if (data === undefined) return null

  return <Overlay {...features['m3u8']}>{props.children}</Overlay>
}

export default Layout
