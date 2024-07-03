'use client'

import { useCallback, useEffect, useState } from 'react'
import useVideo from './useVideo'

const useVideoVolume = () => {
  const { ref } = useVideo()

  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(0)

  useEffect(() => {
    if (!ref.current) {
      return console.error('Video reference is undefined')
    }

    const onVolumeChange = () => {
      if (!ref.current) {
        return console.error('Video reference is undefined')
      }

      setMuted(ref.current.muted)
      setVolume(ref.current.volume)
    }

    onVolumeChange()

    ref.current.addEventListener('volumechange', onVolumeChange)

    return () => {
      ref.current?.removeEventListener('volumechange', onVolumeChange)
    }
  }, [ref])

  const seekVolume = useCallback(
    (percent: number) => {
      if (!ref.current) {
        throw new Error('Video reference is undefined')
      }

      ref.current.volume = Math.min(Math.max(percent, 0), 1)
    },
    [ref],
  )

  const toggleMute = useCallback(() => {
    if (!ref.current) {
      throw new Error('Video reference is undefined')
    }

    ref.current.muted = !ref.current.muted
  }, [ref])

  return {
    muted,
    volume,
    seekVolume,
    toggleMute,
  }
}

export default useVideoVolume
