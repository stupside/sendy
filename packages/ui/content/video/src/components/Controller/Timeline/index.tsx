'use client'

import { type FC } from 'react'

import { Time } from '@sendy/ui-typography'

import { useVideo } from 'src/hooks'

import Line from './Line'
import Play from './Play'

const Timeline: FC = () => {
  const { useVideoTimeline } = useVideo()

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
