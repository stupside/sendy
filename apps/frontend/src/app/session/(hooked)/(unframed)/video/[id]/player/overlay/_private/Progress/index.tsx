'use client'

import { type FC, useCallback, useEffect, useRef } from 'react'

import { useFocusable } from '@sendy/react-spatial'

const Line: FC<{
  value: number
  realtime: boolean
  direction: 'horizontal' | 'vertical'
  seek: (percent: number, buffering: boolean) => void
}> = ({ value, seek, realtime, direction }) => {
  const isHolding = useRef(false)

  const { ref, focused } = useFocusable({})

  const getPercent = useCallback(
    (clientX: number, clientY: number) => {
      if (ref.current instanceof HTMLElement) {
        const rect = ref.current.getBoundingClientRect()

        const clientXY = direction === 'horizontal' ? clientX : clientY

        const rectLR = direction === 'horizontal' ? rect.left : rect.top
        const rectWH = direction === 'horizontal' ? rect.width : rect.height

        const percent = (clientXY - rectLR) / rectWH

        const clamped = Math.min(Math.max(percent, 0), 1)

        return direction === 'horizontal' ? clamped : 1 - clamped
      } else {
        throw new Error('ref.current is not an instance of HTMLElement')
      }
    },
    [ref.current, direction],
  )

  useEffect(() => {
    const onMouseUp = (e: MouseEvent) => {
      if (isHolding.current) {
        seek(getPercent(e.clientX, e.clientY), false)
      }

      isHolding.current = false
    }

    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [seek, isHolding, getPercent])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isHolding.current) {
        seek(getPercent(e.clientX, e.clientY), !realtime)
      }
    }

    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [getPercent, isHolding, seek, realtime])

  const percent = value * 100

  return (
    <div
      ref={ref}
      aria-valuemin={0}
      role="progressbar"
      aria-valuemax={100}
      aria-valuenow={percent}
      className={`relative flex items-center cursor-pointer ${direction === 'horizontal' ? 'flex-row w-full' : 'flex-col-reverse h-full'}`}
      onMouseDown={() => {
        isHolding.current = true
      }}
      onClick={(e) => {
        seek(getPercent(e.clientX, e.clientY), false)
      }}
    >
      <div
        className={`rounded-full ${direction === 'horizontal' ? 'h-2' : 'w-2'} ${focused ? 'bg-zinc-200' : 'bg-zinc-300 hover:bg-zinc-200 focus:bg-zinc-200'}`}
        style={
          direction === 'horizontal'
            ? {
                width: `${percent}%`,
              }
            : {
                height: `${percent}%`,
              }
        }
      ></div>
      <span className="relative flex items-center justify-center">
        <button
          title="timeline"
          className="absolute rounded-full w-4 h-4 bg-white shadow-2xl"
        ></button>
      </span>
      <div
        className={`flex-grow rounded-full ${direction === 'horizontal' ? 'h-2' : 'w-2'} ${focused ? 'bg-zinc-600' : 'bg-zinc-700 hover:bg-zinc-600'}`}
      ></div>
    </div>
  )
}

export default Line
