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

import { VideoAudioContext } from '@sendy/react-media-video'

import useHls from '@/hooks/useHls'

const AudioProvider: FC<PropsWithChildren> = ({ children }) => {
  const hls = useHls()

  const [audio, setAudio] = useState<number>(0)

  const audios = useMemo(() => new Set(hls?.audioTracks), [hls?.audioTracks])

  useEffect(() => {
    hls && setAudio(hls.audioTrack)

    hls?.on(Hls.Events.AUDIO_TRACK_LOADED, (_, data) => {
      setAudio(data.id)
    })

    hls?.on(Hls.Events.AUDIO_TRACKS_UPDATED, () => {
      setAudio(hls.audioTrack)
    })

    return () => {
      hls?.off(Hls.Events.AUDIO_TRACK_LOADED)
      hls?.off(Hls.Events.AUDIO_TRACKS_UPDATED)
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
