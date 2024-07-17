'use client'

import {
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react'

import Hls, { Events, type HlsConfig } from 'hls.js'

import { useVideo } from '@sendy/react-media-video'

import HlsContext from '@/contexts/HlsContext'

const HlsProvider: FC<
  PropsWithChildren<{
    config: Partial<HlsConfig>
  }>
> = ({ config, children }) => {
  const { url, ref } = useVideo()

  const [hls, setHls] = useState<Hls | undefined>()

  useEffect(() => {
    if (Hls.isSupported()) {
      if (!ref.current) {
        throw new Error('Ref is not attached')
      }

      const _hls = new Hls(config)

      _hls.attachMedia(ref.current)

      setHls(_hls)

      return () => {
        _hls.detachMedia()
      }
    }

    throw new Error('Hls is not supported')
  }, [ref, config])

  const deferredUrl = useDeferredValue(url)

  useLayoutEffect(() => {
    const onMediaAttached = () => {
      hls?.loadSource(deferredUrl)
    }

    const onMediaDetached = () => {
      hls?.stopLoad()
    }

    hls?.on(Events.MEDIA_ATTACHED, onMediaAttached)
    hls?.on(Events.MEDIA_DETACHED, onMediaDetached)

    return () => {
      hls?.off(Events.MEDIA_ATTACHED, onMediaAttached)
      hls?.off(Events.MEDIA_DETACHED, onMediaDetached)
    }
  }, [hls, deferredUrl])

  return (
    <HlsContext.Provider
      value={{
        instance: hls,
      }}
    >
      {children}
    </HlsContext.Provider>
  )
}

export default HlsProvider
