'use client'

import { useCallback, useMemo, useEffect, useState } from 'react'

import useVideo from './useVideo'

const useVideoTimeline = () => {
  const { video } = useVideo()

  const [timeline, setTimeline] = useState(0)

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

  const seekTimeline = useCallback(
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
    timeline,
    duration,
    seekTimeline,
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
