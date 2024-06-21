'use client'

import { type FC } from 'react'

import { useVideoTimeline } from '@sendy/ui-content-video'

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
    <span>
      {minutes}:{secondes}
    </span>
  )
}

const Timeline: FC = () => {
  const { timeline, duration, seek } = useVideoTimeline()

  return (
    <footer>
      <Play />
      <div>
        <Time value={timeline} />
      </div>
      <Line current={timeline} duration={duration} seek={seek} />
      <div>
        <Time value={duration} />
      </div>
    </footer>
  )
}

export default Timeline
