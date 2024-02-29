'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FC, PropsWithChildren, useMemo } from 'react'

import { useFocusable } from '@sendy/react-spatial'

import { prettySeconds } from '@/tools/timestamp'

const VideoLink: FC<
  PropsWithChildren<{
    id: number
    date: number
    title: string
    poster: string
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

  const { hours, minutes } = prettySeconds((Date.now() - props.date) / 1000)

  return (
    <Link
      prefetch
      ref={ref}
      href={redirection}
      className={`block relative w-full h-full rounded-xl shadow-2xl overflow-hidden duration-100 ${
        focused ? 'scale-100' : 'scale-95'
      }`}
    >
      <Image
        priority
        width={128}
        height={192}
        src={props.poster}
        className="object-cover"
        alt={`Poster of ${props.title}`}
      />
      <div className="absolute inset-0 px-3 py-2 flex flex-col justify-end bg-gradient-to-b from-black/5 via-black/10 to-black/90">
        <footer>
          <p className="text-xs font-light">
            {hours}h {minutes}m ago
          </p>
          <h1 className="font-extrabold text-xs mr-5">{props.title}</h1>
        </footer>
      </div>
    </Link>
  )
}

export default VideoLink
