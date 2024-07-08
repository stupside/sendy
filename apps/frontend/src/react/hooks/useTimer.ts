'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const ONE_SEC_IN_MS = 1000

const useTimer = ({ expiry }: { expiry: number }) => {
  const getRemaining = useCallback(() => {
    const remaining = expiry - Date.now()

    if (remaining) return remaining

    return 0
  }, [expiry])

  const [remaining, setRemaining] = useState<number>(getRemaining)

  const interval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    interval.current = setTimeout(() => {
      setRemaining(getRemaining())
    }, ONE_SEC_IN_MS)

    return () => {
      clearTimeout(interval.current)
    }
  }, [interval.current, getRemaining])

  return {
    remaining: new Date(remaining),
  }
}

export default useTimer
