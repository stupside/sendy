'use client'

import { type FC } from 'react'

import { useVideoTimeline } from 'src/hooks'

import Line from './Line'
import Play from './Play'
import Time from './Time'

const Timeline: FC = () => {
  const { timeline, duration, seekTimeline } = useVideoTimeline()

  return (
    <>
      <Play />
      <div>
        <Time time={timeline} />
      </div>
      <Line
        current={timeline}
        duration={duration}
        seek={(percent) => {
          seekTimeline(percent)
        }}
      />
      <div>
        <Time time={duration} />
      </div>
    </>
  )
}

export default Timeline
