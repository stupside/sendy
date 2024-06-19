'use client'

import { FC, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import useTimer from '@/react/hooks/useTimer'

const CodeExpiry: FC<{ expiry: number }> = ({ expiry }) => {
  const router = useRouter()

  const { remaining } = useTimer({ expiry })

  const seconds = remaining.getSeconds()

  useEffect(() => {
    if (seconds === 0) {
      router.refresh()
    }
  }, [router, seconds])

  return (
    <p className="font-extralight text-sm italic">
      The code will expire in <span className="font-mono">{seconds}</span>{' '}
      seconds
    </p>
  )
}

export default CodeExpiry
