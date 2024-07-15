'use client'

import { useLayoutEffect, useRef, useState } from 'react'

const ONE_SEC_IN_MS = 1000

const getRemainingTime = (expiry: number) => {
  return new Date(expiry).getTime() - new Date().getTime()
}

const getRemainingTimeInSeconds = (expiry: number) => {
  return Math.floor(getRemainingTime(expiry) / ONE_SEC_IN_MS)
}

const useTimer = ({ expiry }: { expiry: number }) => {
  const interval = useRef<NodeJS.Timeout>()

  const [remaining, setRemaining] = useState<number>(
    getRemainingTimeInSeconds(expiry),
  )

  useLayoutEffect(() => {
    interval.current = setInterval(() => {
      setRemaining(getRemainingTimeInSeconds(expiry))
    }, ONE_SEC_IN_MS)

    return () => {
      clearTimeout(interval.current)
    }
  }, [interval.current, expiry])

  return {
    remaining,
  }
}

export default useTimer
