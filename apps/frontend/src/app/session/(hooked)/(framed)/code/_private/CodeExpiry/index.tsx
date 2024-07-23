'use client'

import { FC, useEffect } from 'react'

import useTimer from '@/react/hooks/useTimer'

const CodeExpiry: FC<{
  expiry: number
  refresh: () => Promise<void>
}> = ({ expiry, refresh }) => {
  const { remaining } = useTimer({ expiry })

  useEffect(() => {
    if (remaining === 0) {
      refresh()
    }
  }, [remaining, refresh])

  return (
    <p className="font-extralight text-sm italic">
      The code expires in <span className="font-mono">{remaining}</span> seconds
    </p>
  )
}

export default CodeExpiry
