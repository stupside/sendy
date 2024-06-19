'use client'

import { useEffect, useLayoutEffect, useState } from 'react'

import Hls, { type HlsConfig } from 'hls.js'

import { useVideo } from '@sendy/ui-content-video'

import VideoHlsContext from 'src/contexts/VideoHlsContext'

const VideoHlsProvider = ({
  config,
  children,
}: {
  children: React.ReactNode
  config: Partial<HlsConfig>
}) => {
  const { url, video } = useVideo()

  const [hls, setHls] = useState<Hls>()

  useLayoutEffect(() => {
    setHls(() => {
      if (Hls.isSupported()) {
        return new Hls({ enableWebVTT: false, ...config })
      }

      return undefined
    })
  }, [config])

  useEffect(() => {
    if (video.current) {
      hls?.attachMedia(video.current)
    }

    hls?.loadSource(url)

    return () => {
      hls?.destroy()
    }
  }, [video.current, hls])

  if (hls) {
    return (
      <VideoHlsContext.Provider value={{ hls }}>
        {children}
      </VideoHlsContext.Provider>
    )
  }

  return null
}

export default VideoHlsProvider
