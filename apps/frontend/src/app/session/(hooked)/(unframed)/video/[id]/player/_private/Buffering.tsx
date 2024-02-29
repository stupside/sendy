'use client'

import { useRouter } from 'next/navigation'

import { FC, PropsWithChildren, useEffect } from 'react'

import { useVideoBuffer } from '@sendy/react-media-video'

const overlay = (id: number) => `/session/video/${id}/player/overlay`

const Buffering: FC<
  PropsWithChildren<{ id: number; message: string }>
> = async (props) => {
  const router = useRouter()

  useEffect(() => {
    const onMouseMove = () => {
      router.replace(overlay(props.id))
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [router.push, props.id])

  const buffering = useVideoBuffer()

  if (buffering) {
    return (
      <div className="m-auto">
        <h1 className="text-3xl font-bold animate-pulse">{props.message}</h1>
      </div>
    )
  }

  return <>{props.children}</>
}

export default Buffering
