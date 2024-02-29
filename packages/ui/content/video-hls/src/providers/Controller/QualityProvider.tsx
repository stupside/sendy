import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Hls from 'hls.js'

import { VideoQualityContext } from '@sendy/ui-content-video'

import useVideoHls from 'src/hooks/useVideoHls'

const VideoHlsQualityProvider: FC<PropsWithChildren> = ({ children }) => {
  const { hls } = useVideoHls()

  const [quality, setQuality] = useState<number>(0)

  const qualities = useMemo(
    () =>
      new Set(
        hls.levels.map((level, index) => ({
          id: index,
          name: level.name ?? `undefined${index}`,
        })),
      ),
    [hls.levels],
  )

  useEffect(() => {
    setQuality(hls.currentLevel)

    hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
      setQuality(data.level)
    })

    return () => {
      hls.off(Hls.Events.LEVEL_LOADED)
    }
  }, [hls])

  const changeQuality = useCallback(
    (quality?: number) => {
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

  return (
    <VideoQualityContext.Provider
      value={{
        quality,
        qualities,
        changeQuality,
      }}
    >
      {children}
    </VideoQualityContext.Provider>
  )
}

export default VideoHlsQualityProvider
