'use client'

import { FC, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import useTimer from '@/react/hooks/useTimer'

const CodeExpiry: FC<{ expiry: number }> = ({ expiry }) => {
  const router = useRouter()

  const { remaining } = useTimer({ expiry })

  useEffect(() => {
    if (remaining <= 0) {
      router.refresh()
    }
  }, [router, remaining])

  const seconds = remaining + 1

  return (
    <p className="font-extralight text-sm italic">
      The code expires in <span className="font-mono">{seconds}</span> seconds
    </p>
  )
}

export default CodeExpiry
