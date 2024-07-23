'use client'

import { NextPage } from 'next'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { useVideoBuffer } from '@sendy/react-media-video'

const overlay = (id: number) => `/session/video/${id}/player/overlay`

const Page: NextPage<{ params: { id: number } }> = (props) => {
  const router = useRouter()

  useEffect(() => {
    const onMouseMove = () => {
      router.replace(overlay(props.params.id))
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [router.push, props.params.id])

  const buffering = useVideoBuffer()

  if (buffering) {
    return (
      <div className="m-auto">
        <h1 className="text-3xl font-bold animate-pulse">Loading</h1>
      </div>
    )
  }

  return null
}

export default Page
