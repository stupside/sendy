'use client'

import { useEffect, useRef, useState } from 'react'

const ONE_SEC_IN_MS = 1000

const getRemainingTime = (expiry: number) => {
  return expiry - new Date().getTime()
}

const useTimer = ({ expiry }: { expiry: number }) => {
  const interval = useRef<NodeJS.Timeout>(undefined)

  const [remaining, setRemaining] = useState<number>(getRemainingTime(expiry))

  useEffect(() => {
    interval.current = setInterval(() => {
      setRemaining((old) => old - ONE_SEC_IN_MS)
    }, ONE_SEC_IN_MS)

    return () => {
      clearTimeout(interval.current)
    }
  }, [interval.current, expiry])

  useEffect(() => {
    if (Math.trunc(remaining) < 0) {
      clearInterval(interval.current)
    }
  }, [remaining, interval.current])

  return {
    remaining: Math.trunc(Math.max(remaining / ONE_SEC_IN_MS + 1, 0)),
  }
}

export default useTimer
