'use client'

import { type FC } from 'react'

import { useVideoTimeline } from '@sendy/react-media-video'

import Line from './Line'
import Play from './Play'

const prettyNumber = (value: number) => {
  return value < 10 ? `0${value}` : value
}

const prettyTime = (value: number) => {
  const minutes = Number((value / 60).toFixed())

  return {
    minutes: prettyNumber(minutes),
    secondes: prettyNumber(value % 60),
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
  const { timeline, duration, seek } = useVideoTimeline()

  return (
    <div className="flex gap-x-4 items-center mx-8">
      <Play />
      <div>
        <Time value={timeline} />
      </div>
      <Line current={timeline} duration={duration} seek={seek} />
      <div>
        <Time value={duration - timeline} />
      </div>
    </div>
  )
}

export default Timeline
