'use client'

import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { Events, type HlsListeners, type MediaPlaylist } from 'hls.js'

import { VideoAudioContext } from '@sendy/react-media-video'

import useHls from '@/hooks/useHls'

const AudioProvider: FC<PropsWithChildren> = ({ children }) => {
  const { instance: hls } = useHls()

  const [audio, setAudio] = useState<number>(0)

  const [audios, setAudios] = useState<Set<MediaPlaylist>>(new Set())

  useEffect(() => {
    hls && setAudio(hls.audioTrack)

    const onMediaDetached: HlsListeners[Events.MEDIA_DETACHED] = () => {
      setAudio(0)
      setAudios(new Set())
    }

    const onAudioTrackSwitched: HlsListeners[Events.AUDIO_TRACK_SWITCHED] = (
      _,
      data,
    ) => {
      setAudio(data.id)
    }

    const onAudioTracksUpdated: HlsListeners[Events.AUDIO_TRACKS_UPDATED] = (
      _,
      data,
    ) => {
      setAudios((old) => {
        return old.union(new Set(data.audioTracks))
      })
    }

    hls?.on(Events.MEDIA_DETACHED, onMediaDetached)
    hls?.on(Events.AUDIO_TRACK_SWITCHED, onAudioTrackSwitched)
    hls?.on(Events.AUDIO_TRACKS_UPDATED, onAudioTracksUpdated)

    return () => {
      hls?.off(Events.MEDIA_DETACHED, onMediaDetached)
      hls?.off(Events.AUDIO_TRACK_SWITCHED, onAudioTrackSwitched)
      hls?.off(Events.AUDIO_TRACKS_UPDATED, onAudioTracksUpdated)
    }
  }, [hls])

  const change = useCallback(
    (audio: number) => {
      if (!hls) {
        throw new Error('Hls instance is undefined')
      }

      const index = hls.audioTracks.findIndex(({ id }) => id === audio)

      hls.audioTrack = index
    },
    [hls],
  )

  useEffect(() => {
    setAudios((old) => {
      return old.union(new Set(hls?.audioTracks))
    })
  }, [hls?.audioTracks])

  return (
    <VideoAudioContext.Provider
      value={{
        audio,
        audios,
        change,
      }}
    >
      {children}
    </VideoAudioContext.Provider>
  )
}

export default AudioProvider
