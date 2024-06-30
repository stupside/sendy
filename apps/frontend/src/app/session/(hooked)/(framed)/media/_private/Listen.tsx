'use client'

import { useRouter } from 'next/navigation'

import { FC, useEffect } from 'react'

import { useSseValue } from '@/react/hooks'

const intent = (id: number) => `/session/media/${id}/intent`

const Listen: FC = () => {
  const router = useRouter()

  const content = useSseValue('/content/cast')

  useEffect(() => {
    if (content) {
      router.push(intent(content.id))
    }
  }, [content?.id])

  return null
}

export default Listen
