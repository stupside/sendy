'use client'

import { useCallback, useEffect, useState } from 'react'

import useVideo from './useVideo'

const useVideoPip = () => {
  const { video } = useVideo()

  const toggle = useCallback(() => {
    if (video.current) {
      video.current.requestPictureInPicture()
    }
  }, [video.current])

  return { toggle }
}

const useVideoFullscreen = () => {
  const { player } = useVideo()

  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const onFullscreen = () => {
      setEnabled(document.fullscreenElement === player.current)
    }

    player.current?.addEventListener('fullscreenchange', onFullscreen)

    return () => {
      player.current?.removeEventListener('fullscreenchange', onFullscreen)
    }
  }, [player.current])

  const toggle = useCallback(async () => {
    if (player.current) {
      if (enabled) {
        await document.exitFullscreen()
      } else {
        await player.current.requestFullscreen()
      }
    }
  }, [player.current])

  return {
    toggle,
    enabled,
  }
}

export { useVideoPip, useVideoFullscreen }
