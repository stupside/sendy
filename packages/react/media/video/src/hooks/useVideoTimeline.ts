'use client'

import { useCallback, useEffect, useState } from 'react'

import useVideo from './useVideo'

const useVideoTimeline = () => {
  const { ref } = useVideo()

  const [paused, setPaused] = useState(true)

  const [duration, setDuration] = useState(0)
  const [position, setPosition] = useState(0)

  const play = useCallback(() => {
    if (!ref.current) {
      throw new Error('Video reference is undefined')
    }

    ref.current.play()
  }, [ref])

  const pause = useCallback(() => {
    if (!ref.current) {
      throw new Error('Video reference is undefined')
    }

    ref.current.pause()
  }, [ref])

  useEffect(() => {
    if (!ref.current) {
      return console.error('Video reference is undefined')
    }

    const onPlay = () => setPaused(false)
    const onPause = () => setPaused(true)

    setPaused(ref.current.paused)

    ref.current.addEventListener('play', onPlay)
    ref.current.addEventListener('pause', onPause)

    return () => {
      ref.current?.removeEventListener('play', onPlay)
      ref.current?.removeEventListener('pause', onPause)
    }
  }, [ref])

  useEffect(() => {
    if (!ref.current) {
      return console.error('Video reference is undefined')
    }

    const onTimeUpdate = () =>
      setPosition(Number(ref.current?.currentTime.toFixed()))

    onTimeUpdate()

    ref.current.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      ref.current?.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [ref])

  useEffect(() => {
    if (!ref.current) {
      return console.error('Video reference is undefined')
    }

    const onDurationChange = () =>
      setDuration(Number(fixNumber(ref.current?.duration).toFixed()))

    onDurationChange()

    ref.current.addEventListener('durationchange', onDurationChange)

    return () => {
      ref.current?.removeEventListener('durationchange', onDurationChange)
    }
  }, [ref])

  const seek = useCallback(
    (position: number) => {
      if (!ref.current) {
        throw new Error('Video reference is undefined')
      }

      ref.current.currentTime = position
    },
    [ref],
  )

  return {
    seek,
    play,
    pause,
    paused,
    position,
    duration,
  }
}

const fixNumber = (value?: number): number => {
  if (value === undefined || isNaN(value)) return 0

  return value
}

export default useVideoTimeline
