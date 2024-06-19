'use client'

import { useCallback, useEffect, useState } from 'react'

import useVideo from './useVideo'

const useVideoVolume = () => {
  const { video } = useVideo()

  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(0)

  useEffect(() => {
    const onVolumeChange = () => {
      if (video.current) {
        setVolume(video.current.volume)
        setMuted(video.current.muted)
      }
    }

    onVolumeChange()

    video.current?.addEventListener('volumechange', onVolumeChange)

    return () => {
      video.current?.removeEventListener('volumechange', onVolumeChange)
    }
  }, [video.current])

  const seekVolume = useCallback(
    (percent: number) => {
      if (video.current) {
        video.current.volume = Math.min(Math.max(percent, 0), 1)
      }
    },
    [video.current],
  )

  const toggleMute = useCallback(() => {
    if (video.current) {
      video.current.muted = !muted
    }
  }, [video.current, muted])

  return {
    muted,
    volume,
    seekVolume,
    toggleMute,
  }
}

export default useVideoVolume
