'use client'

import {
  type FC,
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useFocusable } from '@sendy/react-spatial'

const Line: FC<{
  current: number
  duration: number
  seek: (percent: number) => void
}> = ({ duration, current, seek }) => {
  const { ref, focused } = useFocusable({})

  const isHolding = useRef(false)

  const [bufferedPercent, setBufferedPercent] = useState(0)

  const deferredBufferedPercent = useDeferredValue(bufferedPercent)

  const getPercent = useCallback(
    (clientX: number) => {
      if (ref.current instanceof HTMLElement) {
        const rect = ref.current.getBoundingClientRect()

        const percent = (clientX - rect.left) / rect.width

        const clamped = Math.min(Math.max(percent, 0), 1)

        return clamped
      } else {
        throw new Error('ref.current is not an instance of HTMLElement')
      }
    },
    [ref.current],
  )

  useEffect(() => {
    const onMouseUp = () => {
      if (isHolding.current) {
        seek(deferredBufferedPercent * duration)
      }

      isHolding.current = false
    }

    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [seek, isHolding, deferredBufferedPercent])

  useEffect(() => {
    const onMouseMove = (props: MouseEvent) => {
      if (isHolding.current) {
        setBufferedPercent(getPercent(props.clientX))
      }
    }

    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [getPercent, isHolding])

  const percent = isHolding.current
    ? bufferedPercent * 100
    : (current / duration) * 100

  return (
    <div
      ref={ref}
      className="relative w-full flex items-center cursor-pointer"
      onClick={(e) => {
        seek(getPercent(e.clientX) * duration)
      }}
      onMouseDown={() => {
        isHolding.current = true
      }}
    >
      <div
        className={`h-2 rounded-full ${focused ? 'bg-zinc-200' : 'bg-zinc-300 hover:bg-zinc-200 focus:bg-zinc-200'}`}
        style={{
          width: `${percent}%`,
        }}
      ></div>
      <span className="relative flex items-center justify-center">
        <button
          title="timeline"
          className={`absolute w-4 h-4 rounded-full bg-zinc-200`}
        ></button>
      </span>
      <div
        className={`flex-grow h-2 rounded-full ${focused ? 'bg-zinc-700' : 'bg-zinc-800'}`}
      ></div>
    </div>
  )
}

export default Line
