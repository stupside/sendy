'use client'

import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { Events, type HlsListeners } from 'hls.js'

import { VideoQualityContext } from '@sendy/react-media-video'

import useHls from '@/hooks/useHls'

const QualityProvider: FC<PropsWithChildren> = ({ children }) => {
  const { instance: hls } = useHls()

  const [quality, setQuality] = useState<number>(0)

  const [qualities, setQualitites] = useState<
    Set<{
      id: number
      name: string
    }>
  >(new Set())

  const change = useCallback(
    (quality?: number) => {
      if (!hls) {
        throw new Error('Hls instance is undefined')
      }

      if (quality === undefined) {
        hls.nextLevel = -1
      } else {
        const index = Array.from(qualities).findIndex(
          ({ id }) => id === quality,
        )

        hls.nextLevel = index
      }
    },
    [hls, qualities],
  )

  useEffect(() => {
    hls && setQuality(hls.currentLevel)

    const onMediaDetached: HlsListeners[Events.MEDIA_DETACHED] = () => {
      setQuality(0)
      setQualitites(new Set())
    }

    const onLevelSwitched: HlsListeners[Events.LEVEL_SWITCHED] = (_, data) => {
      setQuality(data.level)
    }

    hls?.on(Events.LEVEL_SWITCHED, onLevelSwitched)
    hls?.on(Events.MEDIA_DETACHED, onMediaDetached)

    return () => {
      hls?.off(Events.LEVEL_SWITCHED, onLevelSwitched)
      hls?.off(Events.MEDIA_DETACHED, onMediaDetached)
    }
  }, [hls])

  useEffect(() => {
    setQualitites((old) => {
      return old.union(
        new Set(
          hls?.levels.map((level, index) => ({
            id: index,
            name: level.name ?? `undefined${index}`,
          })),
        ),
      )
    })
  }, [hls?.levels])

  return (
    <VideoQualityContext.Provider
      value={{
        change,
        quality,
        qualities,
      }}
    >
      {children}
    </VideoQualityContext.Provider>
  )
}

export default QualityProvider
