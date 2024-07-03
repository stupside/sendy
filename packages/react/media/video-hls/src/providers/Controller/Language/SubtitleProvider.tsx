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

import { VideoSubtitleContext } from '@sendy/react-media-video'

import useHls from '@/hooks/useHls'

const SubtitleProvider: FC<PropsWithChildren> = ({ children }) => {
  const hls = useHls()

  const [subtitle, setSubtitle] = useState<number>(0)

  const subtitles = useMemo(
    () => new Set(hls?.subtitleTracks ?? []),
    [hls?.subtitleTracks],
  )

  useEffect(() => {
    if (hls === undefined) {
      return console.error('Hls instance is undefined')
    }

    setSubtitle(hls.subtitleTrack)

    hls.on(Hls.Events.SUBTITLE_TRACK_LOADED, (_, data) => {
      setSubtitle(data.id)
    })

    return () => {
      hls.off(Hls.Events.SUBTITLE_TRACK_LOADED)
    }
  }, [hls])

  const change = useCallback(
    (subtitle?: number) => {
      if (hls === undefined) {
        throw new Error('Hls instance is undefined')
      }

      if (subtitle === undefined) {
        hls.subtitleDisplay = false
      } else {
        const index = Array.from(subtitles).findIndex(
          ({ id }) => id === subtitle,
        )

        hls.subtitleDisplay = true
        hls.subtitleTrack = index
      }
    },
    [subtitles],
  )

  return (
    <VideoSubtitleContext.Provider
      value={{
        change,
        subtitle,
        subtitles,
      }}
    >
      {children}
    </VideoSubtitleContext.Provider>
  )
}

export default SubtitleProvider
