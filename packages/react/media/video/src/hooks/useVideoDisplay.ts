'use client'

import { useCallback, useEffect, useState } from 'react'

import useVideo from './useVideo'

const useVideoPip = () => {
  const { ref } = useVideo()

  const toggle = useCallback(() => {
    if (!ref.current) {
      return console.error('Video reference is undefined')
    }

    ref.current.requestPictureInPicture().catch((error) => {
      console.error('Error entering Picture-in-Picture mode:', error)
    })
  }, [ref])

  return { toggle }
}

const useVideoFullscreen = () => {
  const { player } = useVideo()

  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!player.current) {
      return console.error('Player reference is undefined')
    }

    const onFullscreenChange = () => {
      setEnabled(document.fullscreenElement === player.current?.parentElement)
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [player])

  const toggle = useCallback(async () => {
    if (!player.current) {
      throw new Error('Player reference is undefined')
    }

    if (enabled) {
      await document.exitFullscreen().catch((error) => {
        console.error('Error exiting fullscreen mode:', error)
      })
    } else {
      await player.current.parentElement?.requestFullscreen().catch((error) => {
        console.error('Error entering fullscreen mode:', error)
      })
    }
  }, [enabled, player])

  return {
    toggle,
    enabled,
  }
}

export { useVideoPip, useVideoFullscreen }
