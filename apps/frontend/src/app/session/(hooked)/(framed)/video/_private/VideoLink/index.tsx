'use client'

import { ComponentProps, FC, PropsWithChildren, useMemo } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { useFocusable } from '@sendy/react-spatial'

const VideoLink: FC<
  PropsWithChildren<{
    id: number
  }>
> = (props) => {
  const router = useRouter()

  const redirection = useMemo(() => `/session/video/${props.id}`, [props.id])

  const config: Parameters<typeof useFocusable>[0] = useMemo(
    () => ({
      onFocus: async () => {
        router.push(redirection)
      },
    }),
    [router, redirection],
  )

  const { ref, focused } = useFocusable(config)

  return (
    <Link
      prefetch
      ref={ref}
      href={redirection}
      className={`block relative w-full h-full rounded-xl shadow-2xl overflow-hidden duration-100 ${
        focused ? 'scale-100' : 'scale-95'
      }`}
    >
      {props.children}
    </Link>
  )
}

export default VideoLink
