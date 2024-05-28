import { type FC } from 'react'

import { VideoController } from '@sendy/ui-content-video-hls'

const VideoHlsController: FC = () => {
  return (
    <VideoController
      features={{
        quality: {
          Provider: false,
        },
        language: {
          Audio: false,
          Subtitle: false,
        },
        display: {
          pip: true,
          fullscreen: true,
        },
      }}
    />
  )
}

export default VideoHlsController
