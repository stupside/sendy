'use client'

import {
  useEffect,
  useLayoutEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react'

import Hls, { type HlsConfig } from 'hls.js'

import { useVideo } from '@sendy/ui-content-video'

import HlsContext from '@/contexts/HlsContext'

const VideoHlsProvider: FC<
  PropsWithChildren<{
    config: Partial<HlsConfig>
  }>
> = ({ config, children }) => {
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
    return <HlsContext.Provider value={{ hls }}>{children}</HlsContext.Provider>
  }

  return null
}

export default VideoHlsProvider
