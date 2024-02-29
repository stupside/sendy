'use client'

import { FC, memo, useEffect } from 'react'

import useTimer from '@/react/hooks/useTimer'

const Timer: FC<{
  expiry: number
  onTimeout: () => Promise<void>
}> = ({ expiry, onTimeout }) => {
  const { remaining } = useTimer({
    expiry,
  })

  useEffect(() => {
    if (remaining <= 0) {
      onTimeout()
    }
  }, [remaining, onTimeout])

  return (
    <p className="font-extralight text-sm italic">
      The code expires in <span className="font-mono">{remaining}</span> seconds
    </p>
  )
}

export default memo(Timer)
