'use client'

import { useCallback, useMemo, useEffect, useState } from 'react'

import useVideo from './useVideo'

const useVideoTimeline = () => {
  const { video } = useVideo()

  const [timeline, setTimeline] = useState(0)

  const [paused, setPaused] = useState(true)

  const play = useCallback(() => {
    video.current?.play()
  }, [video.current])

  const pause = useCallback(() => {
    video.current?.pause()
  }, [])

  useEffect(() => {
    const { current } = video

    const onPause = () => {
      setPaused(true)
    }

    const onPlay = () => {
      setPaused(false)
    }

    setPaused(current?.paused ?? true)

    current?.addEventListener('play', onPlay)
    current?.addEventListener('pause', onPause)

    return () => {
      current?.removeEventListener('play', onPlay)
      current?.removeEventListener('pause', onPause)
    }
  }, [video.current])

  useEffect(() => {
    const onTimeUpdate = () => {
      if (video.current) {
        const time = Number(video.current?.currentTime.toFixed())

        setTimeline(time)
      }
    }

    onTimeUpdate()

    video.current?.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      video.current?.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [video.current])

  const seek = useCallback(
    (position: number) => {
      if (video.current) {
        video.current.currentTime = position
      }
    },
    [video.current],
  )

  const duration = useMemo(() => {
    return Number(fixNumber(video.current?.duration).toFixed())
  }, [video.current?.duration])

  return {
    seek,
    play,
    pause,
    paused,
    timeline,
    duration,
  }
}

const fixNumber = (value?: number) => {
  if (value) {
    if (isNaN(value)) return 0

    return value
  }

  return 0
}

export default useVideoTimeline
