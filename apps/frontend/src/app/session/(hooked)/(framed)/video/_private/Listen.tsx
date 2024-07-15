'use client'

import { useRouter } from 'next/navigation'

import { FC, PropsWithChildren, useEffect } from 'react'

import { useSseValue } from '@/react/hooks'

const play = (id: number) => `/session/video/${id}/play`

const Listen: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const content = useSseValue('/media/cast')

  useEffect(() => {
    if (content?.type === 'video') {
      router.push(play(content.id))
    }
  }, [content?.id])

  return <>{children}</>
}

export default Listen
