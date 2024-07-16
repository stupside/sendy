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
    hls && setSubtitle(hls.subtitleTrack)

    hls?.on(Hls.Events.SUBTITLE_TRACK_LOADED, (_, data) => {
      setSubtitle(data.id)
    })

    hls?.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, () => {
      setSubtitle(hls.subtitleTrack)
    })

    return () => {
      hls?.off(Hls.Events.SUBTITLE_TRACK_LOADED)
      hls?.off(Hls.Events.SUBTITLE_TRACKS_UPDATED)
    }
  }, [hls])

  const change = useCallback(
    (subtitle?: number) => {
      if (!hls) {
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
