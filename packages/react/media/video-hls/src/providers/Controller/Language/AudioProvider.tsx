'use client'

import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { Events, type MediaPlaylist } from 'hls.js'

import { VideoAudioContext } from '@sendy/react-media-video'

import useHls from '@/hooks/useHls'

const AudioProvider: FC<PropsWithChildren> = ({ children }) => {
  const hls = useHls()

  const [audio, setAudio] = useState<number>(0)

  const [audios, setAudios] = useState<Set<MediaPlaylist>>(new Set())

  useEffect(() => {
    hls && setAudio(hls.audioTrack)

    hls?.on(Events.AUDIO_TRACK_LOADED, (_, data) => {
      setAudio(data.id)
    })

    hls?.on(Events.AUDIO_TRACKS_UPDATED, () => {
      setAudios((old) => {
        return old.union(new Set(hls?.audioTracks))
      })
    })

    return () => {
      hls?.off(Events.AUDIO_TRACK_LOADED)
      hls?.off(Events.AUDIO_TRACKS_UPDATED)
    }
  }, [hls])

  const change = useCallback(
    (audio: number) => {
      if (!hls) {
        throw new Error('Hls instance is undefined')
      }

      const index = Array.from(audios).findIndex(({ id }) => id === audio)

      hls.audioTrack = index
    },
    [hls, audios],
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
