'use client'

import { type FC, useCallback, useMemo, useState } from 'react'

import Progress from '../Progress'

import { useVideoTimeline } from '@sendy/react-media-video'

const prettyNumber = (value: number) => {
  return value < 10 ? `0${value}` : value
}

const prettyTime = (value: number) => {
  return {
    minutes: prettyNumber(Math.trunc(value / 60)),
    secondes: prettyNumber(Math.trunc(value % 60)),
  }
}

const Time: FC<{ value: number }> = (props) => {
  const { minutes, secondes } = prettyTime(props.value)

  return (
    <span className="text-sm font-mono">
      {minutes}:{secondes}
    </span>
  )
}

const Timeline: FC = () => {
  const { position, duration, seek } = useVideoTimeline()

  const [buffered, setBuffered] = useState<number>()

  const _position = useMemo(() => {
    return buffered === undefined ? position : buffered
  }, [buffered, position])

  const onSeek = useCallback(
    (percent: number, buffering: boolean) => {
      setBuffered(() => {
        if (buffering) {
          return percent * duration
        }

        seek(percent * duration)

        return undefined
      })
    },
    [seek, duration],
  )

  return (
    <div className="flex gap-x-5 items-center">
      <div>
        <Time value={_position} />
      </div>
      <Progress
        seek={onSeek}
        realtime={false}
        direction="horizontal"
        value={_position / duration}
      />
      <div>
        <Time value={duration - _position} />
      </div>
    </div>
  )
}

export default Timeline
