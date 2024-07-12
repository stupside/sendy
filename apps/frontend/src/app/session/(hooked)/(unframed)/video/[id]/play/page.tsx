'use client'

import { NextPage } from 'next'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

const overlay = (id: number) => `/session/video/${id}/play/overlay`

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

  return null
}

export default Page
