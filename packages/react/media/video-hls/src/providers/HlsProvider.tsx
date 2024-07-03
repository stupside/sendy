'use client'

import { useEffect, useState, type FC, type PropsWithChildren } from 'react'

import Hls, { type HlsConfig } from 'hls.js'

import { useVideo } from '@sendy/react-media-video'

import HlsContext from '@/contexts/HlsContext'

const HlsProvider: FC<
  PropsWithChildren<{
    config: Partial<HlsConfig>
  }>
> = ({ config, children }) => {
  const { url, ref } = useVideo()

  const [hls, setHls] = useState<Hls | null>(null)

  useEffect(() => {
    if (Hls.isSupported()) {
      const _hls = new Hls(config)

      if (!ref.current) {
        return console.error('Video reference is undefined')
      }

      _hls.attachMedia(ref.current)

      setHls(_hls)

      return () => {
        _hls.destroy()
      }
    }

    return console.error('Hls is not supported')
  }, [config, ref])

  useEffect(() => {
    hls?.loadSource(url)

    return () => {
      hls?.stopLoad()
    }
  }, [hls, url])

  if (!hls) {
    return null
  }

  return <HlsContext.Provider value={hls}>{children}</HlsContext.Provider>
}

export default HlsProvider
