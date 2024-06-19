'use client'

import { useRouter } from 'next/navigation'

import { FC, useEffect } from 'react'

import { useSseValue } from '@/react/hooks'

const Listen: FC = () => {
  const router = useRouter()

  const content = useSseValue('/content/cast')

  useEffect(() => {
    if (content) {
      router.push(`/session/media/${content.id}/intent`)
    }
  }, [content?.id])

  return null
}

export default Listen
