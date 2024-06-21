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

import { VideoAudioContext } from '@sendy/ui-content-video'

import useHls from '@/hooks/useHls'

const AudioProvider: FC<PropsWithChildren> = ({ children }) => {
  const { hls } = useHls()

  const [audio, setAudio] = useState<number>(hls.audioTrack)

  const audios = useMemo(() => new Set(hls.audioTracks), [hls.audioTracks])

  useEffect(() => {
    setAudio(hls.audioTrack)

    hls.on(Hls.Events.AUDIO_TRACK_LOADED, (_, data) => {
      setAudio(data.id)
    })

    return () => {
      hls.off(Hls.Events.AUDIO_TRACK_LOADED)
    }
  }, [hls])

  const changeAudio = useCallback(
    (audio: number) => {
      const index = Array.from(audios).findIndex(({ id }) => id === audio)

      hls.audioTrack = index
    },
    [audios],
  )

  return (
    <VideoAudioContext.Provider
      value={{
        audio,
        audios,
        changeAudio,
      }}
    >
      {children}
    </VideoAudioContext.Provider>
  )
}

export default AudioProvider
