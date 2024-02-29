import type { FC } from 'react'

import VideoHlsController from './VideoHlsController'
import VideoSimpleController from './VideoSimpleController'

const VideoControllerMapping: Array<{
  Controller: FC
  subtypes: string[]
}> = [
  {
    subtypes: ['m3u8', 'm3u'],
    Controller: VideoHlsController,
  },
]

const getController = (subtype: string) => {
  const mapping = VideoControllerMapping.find((m) =>
    m.subtypes.includes(subtype),
  )

  if (mapping) return mapping.Controller

  return VideoSimpleController
}

export { getController }
