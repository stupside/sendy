import { useCallback, useEffect, useState, type RefObject } from 'react'

const useFullscreen = ({ player }: { player: RefObject<HTMLElement> }) => {
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

const usePip = ({ video }: { video: RefObject<HTMLVideoElement> }) => {
  const toggle = useCallback(() => {
    if (video.current) {
      video.current.requestPictureInPicture()
    }
  }, [video.current])

  return toggle
}

const useVideoDisplay = ({
  video,
  player,
}: {
  video: RefObject<HTMLVideoElement>
  player: RefObject<HTMLElement>
}) => {
  return {
    useVideoPip: () => usePip({ video }),
    useVideoFullscreen: () => useFullscreen({ player }),
  }
}

export default useVideoDisplay
