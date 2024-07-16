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

import Dot from './Dot'

const Line: FC<{
  current: number
  duration: number
  seek: (percent: number) => void
}> = ({ duration, current, seek }) => {
  const { ref } = useFocusable()

  const holding = useRef(false)

  const [buffer, setBuffer] = useState(0)

  const deferredBuffer = useDeferredValue(buffer)

  const getPercent = useCallback((clientX: number) => {
    if (ref.current instanceof HTMLElement) {
      const rect = ref.current.getBoundingClientRect()

      const percent = (clientX - rect.left) / rect.width

      const clamped = Math.min(Math.max(percent, 0), 1)

      return clamped
    } else {
      throw new Error('ref.current is not an instance of HTMLElement')
    }
  }, [])

  useEffect(() => {
    const onMouseUp = () => {
      if (holding.current) {
        seek(deferredBuffer * duration)
      }

      holding.current = false
    }

    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [seek, holding, deferredBuffer])

  useEffect(() => {
    const onMouseMove = (props: MouseEvent) => {
      if (holding.current) {
        setBuffer(getPercent(props.clientX))
      }
    }

    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [getPercent, holding])

  const percent = holding.current ? buffer * 100 : (current / duration) * 100

  return (
    <div
      ref={ref}
      className="relative w-full flex items-center cursor-pointer"
      onClick={(e) => {
        seek(getPercent(e.clientX) * duration)
      }}
      onMouseDown={() => {
        holding.current = true
      }}
    >
      <div className="absolute w-full h-2 bg-zinc-700 rounded-full"></div>
      <div className="absolute w-full flex items-center rounded-full">
        <div
          className={`h-2 bg-zinc-400 rounded-full`}
          style={{
            width: `${percent}%`,
          }}
        ></div>
        <span>
          <Dot />
        </span>
      </div>
    </div>
  )
}

export default Line
