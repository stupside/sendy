'use client'

import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { Events, type HlsListeners, type MediaPlaylist } from 'hls.js'

import { VideoSubtitleContext } from '@sendy/react-media-video'

import useHls from '@/hooks/useHls'

const SubtitleProvider: FC<PropsWithChildren> = ({ children }) => {
  const { instance: hls } = useHls()

  const [subtitle, setSubtitle] = useState<number>(0)

  const [subtitles, setSubtitles] = useState<Set<MediaPlaylist>>(new Set())

  useEffect(() => {
    if (hls) {
      setSubtitle(hls.subtitleTrack)
    }

    const onMediaDetached: HlsListeners[Events.MEDIA_DETACHED] = () => {
      setSubtitle(0)
      setSubtitles(new Set())
    }

    const onSubtitleTrackSwitched: HlsListeners[Events.SUBTITLE_TRACK_SWITCH] =
      (_, data) => {
        setSubtitle(data.id)
      }

    const onSubtitleTracksUpdated: HlsListeners[Events.SUBTITLE_TRACKS_UPDATED] =
      (_, data) => {
        setSubtitles((old) => {
          return old.union(new Set(data.subtitleTracks))
        })
      }

    hls?.on(Events.MEDIA_DETACHED, onMediaDetached)
    hls?.on(Events.SUBTITLE_TRACK_SWITCH, onSubtitleTrackSwitched)
    hls?.on(Events.SUBTITLE_TRACKS_UPDATED, onSubtitleTracksUpdated)

    return () => {
      hls?.off(Events.MEDIA_DETACHED, onMediaDetached)
      hls?.off(Events.SUBTITLE_TRACK_SWITCH, onSubtitleTrackSwitched)
      hls?.off(Events.SUBTITLE_TRACKS_UPDATED, onSubtitleTracksUpdated)
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
        const index = hls.subtitleTracks.findIndex(({ id }) => id === subtitle)

        hls.subtitleTrack = index
        hls.subtitleDisplay = true
      }
    },
    [hls],
  )

  useEffect(() => {
    setSubtitles((old) => {
      return old.union(new Set(hls?.subtitleTracks))
    })
  }, [hls?.subtitleTracks])

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
