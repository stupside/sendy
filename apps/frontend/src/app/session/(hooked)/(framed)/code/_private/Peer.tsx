'use client'

import { useRouter } from 'next/navigation'

import { FC, PropsWithChildren, useEffect } from 'react'

import { useSseValue } from '@/react/hooks'

const Peer: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const value = useSseValue('/session/peer')

  useEffect(() => {
    if (value) {
      router.replace(`/session/video`)
    }
  }, [value, router])

  return <>{children}</>
}

export default Peer
