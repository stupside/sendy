'use client'

import type { FC } from 'react'

import { Controller, type IVideoController } from '@sendy/ui-content-video'

import VideoHlsProvider from 'src/providers'

import AudioProvider from 'src/providers/Controller/AudioProvider'
import QualityProvider from 'src/providers/Controller/QualityProvider'
import SubtitleProvider from 'src/providers/Controller/SubtitleProvider'

const VideoController: FC<IVideoController> = ({
  title,
  features: {
    display = {
      pip: true,
      fullscreen: true,
    },
    quality = { Provider: true },
    language = {
      Audio: true,
      Subtitle: true,
    },
  },
}) => {
  return (
    <VideoHlsProvider config={{}}>
      <Controller
        title={title}
        features={{
          display,
          quality: {
            Provider: quality?.Provider ? QualityProvider : undefined,
          },
          language: {
            Audio: language?.Audio ? AudioProvider : undefined,
            Subtitle: language?.Subtitle ? SubtitleProvider : undefined,
          },
        }}
      />
    </VideoHlsProvider>
  )
}

export default VideoController
