'use client'

import { FC, PropsWithChildren, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSseValue } from '@/react/hooks'

const Peer: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const value = useSseValue('/session/peer')

  useEffect(() => {
    if (value) {
      router.replace(`/session/video`)
    }
  }, [value])

  return <>{children}</>
}

export default Peer
