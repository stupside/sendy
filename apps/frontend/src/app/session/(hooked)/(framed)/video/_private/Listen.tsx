'use client'

import { useRouter } from 'next/navigation'

import { FC, PropsWithChildren, useEffect } from 'react'

import { useSseValue } from '@/react/hooks'

const play = (id: number) => `/session/video/${id}/play`

const Listen: FC<PropsWithChildren> = () => {
  const router = useRouter()

  const content = useSseValue('/media/cast')

  useEffect(() => {
    if (content) {
      router.push(play(content.id))
    }
  }, [content?.id])

  return <>{content}</>
}

export default Listen
