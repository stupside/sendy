import { type FC, useState, useEffect } from 'react'

const ONE_SEC_IN_MS = 1000

const Timer: FC<{ expiry?: number; children: FC<{ remaining: number }> }> = ({
  expiry,
  children,
}) => {
  const [remaining, setRemaining] = useState<number>(expiry ?? 0)

  useEffect(() => {
    if (!expiry) return

    const interval = setInterval(() => {
      setRemaining((old) => {
        const remaining = old - 1

        if (remaining) return remaining

        return 0
      })
    }, ONE_SEC_IN_MS)

    const timeout = setTimeout(() => {
      clearInterval(interval)
    }, expiry * ONE_SEC_IN_MS)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [expiry])

  return children({ remaining })
}

export default Timer
