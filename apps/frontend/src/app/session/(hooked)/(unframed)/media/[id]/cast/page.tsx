'use client'

import { NextPage } from 'next'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useVideo } from '@sendy/ui-content-video'

const Page: NextPage<{ params: { id: number } }> = (props) => {
  const router = useRouter()

  const { player } = useVideo()

  useEffect(() => {
    const onMouseMove = () => {
      router.push(`/session/media/${props.params.id}/video/overlay`)
    }

    player.current?.addEventListener('mousemove', onMouseMove)

    return () => {
      player.current?.removeEventListener('mousemove', onMouseMove)
    }
  }, [router.push, player.current, props.params.id])

  return null
}

export default Page
