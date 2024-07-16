'use client'

import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Hls from 'hls.js'

import { VideoQualityContext } from '@sendy/react-media-video'

import useHls from '@/hooks/useHls'

const QualityProvider: FC<PropsWithChildren> = ({ children }) => {
  const hls = useHls()

  const [quality, setQuality] = useState<number>(0)

  const qualities = useMemo(
    () =>
      new Set(
        hls?.levels.map((level, index) => ({
          id: index,
          name: level.name ?? `undefined${index}`,
        })),
      ),
    [hls?.levels],
  )

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

    hls?.on(Hls.Events.LEVEL_LOADED, (_, data) => {
      setQuality(data.level)
    })

    return () => {
      hls?.off(Hls.Events.LEVEL_LOADED)
    }
  }, [hls])

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
