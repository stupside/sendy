import { type FC, useCallback, useState } from 'react'

import { Focusable } from '@sendy/ui-navigation'

import LineDot from './LineDot'

const Line: FC<{
  current: number
  duration: number
  seek: (percent: number) => void
}> = ({ duration, current, seek }) => {
  const [nextCurrent, setNextCurrent] = useState(0)

  const [timelineHolden, setTimelineHolden] = useState(false)
  const [timelineFocused, setTimelineFocused] = useState(false)

  const onTimelineEvent = useCallback(
    ({
      clientX,
      currentTarget,
    }: {
      clientX: number
      currentTarget: HTMLDivElement
    }) => {
      const percent = getCursorPositionInDiv(clientX, currentTarget)

      const factor = Math.min(Math.max(percent, 0), 1)

      setNextCurrent(factor * duration)
    },
    [duration],
  )

  return (
    <Focusable>
      {({ ref }) => (
        <div
          ref={ref}
          className="relative w-full flex items-center cursor-pointer pt-[3.25px]"
          onMouseEnter={() => {
            setTimelineFocused(true)
          }}
          onMouseLeave={() => {
            setTimelineFocused(false)
          }}
          onMouseDown={() => {
            setTimelineHolden(true)
          }}
          onMouseUp={() => {
            setTimelineHolden(false)

            seek(nextCurrent)
          }}
          onClick={onTimelineEvent}
          onMouseMove={(props) => {
            if (timelineHolden) {
              onTimelineEvent({
                clientX: props.clientX,
                currentTarget: props.currentTarget,
              })
            }
          }}
        >
          <div className={`absolute w-full h-4 bg-zinc-700 rounded-full`}></div>
          <div className="absolute w-full flex items-center rounded-full">
            <div
              className={`h-4 bg-zinc-400 rounded-full`}
              style={{
                width: `${getPercent(
                  duration,
                  timelineHolden ? nextCurrent : current,
                )}%`,
              }}
            ></div>
            {(timelineFocused || timelineHolden) && <LineDot />}
          </div>
        </div>
      )}
    </Focusable>
  )
}

const getPercent = (duration: number, current: number) => {
  if (duration) return Number((100 * current) / duration).toFixed()

  return 0
}

const getCursorPositionInDiv = (clientX: number, target: HTMLDivElement) => {
  const bounds = target.getBoundingClientRect()

  const relativeX = clientX - bounds.left

  const percent = relativeX / target.clientWidth

  return percent
}

export default Line
