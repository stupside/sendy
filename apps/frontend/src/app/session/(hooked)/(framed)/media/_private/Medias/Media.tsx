'use client'

import { ComponentProps, FC, useMemo } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { Focusable } from '@sendy/ui-navigation'

import { prettySeconds } from '@/tools/timestamp'

const Media: FC<{
  id: number
  title: string
  poster: string
  duration: number
}> = (props) => {
  const router = useRouter()

  const redirection = useMemo(() => `/session/media/${props.id}`, [props.id])

  const config: ComponentProps<typeof Focusable>['config'] = useMemo(
    () => ({
      onFocus: async () => {
        router.push(redirection)
      },
    }),
    [router, redirection],
  )

  const age = prettySeconds(1000)

  return (
    <Focusable config={config}>
      {({ ref, focused }) => (
        <Link
          prefetch
          ref={ref}
          href={redirection}
          className={`relative block rounded-xl shadow-2xl overflow-hidden duration-100 ${focused ? 'scale-100' : 'scale-95'}`}
        >
          <Image
            width={120}
            height={180}
            src={props.poster}
            alt={`Poster of ${props.title}`}
          />
          <div className="absolute inset-0 flex flex-col justify-between px-3 py-2 bg-gradient-to-b from-zinc-900 via-zinc-900/10 to-zinc-900">
            <header>
              <p className="text-xs font-light">
                {age.hours}h {age.minutes}m ago
              </p>
            </header>
            <footer>
              <h1 className="font-extrabold text-xs mr-5">{props.title}</h1>
            </footer>
          </div>
        </Link>
      )}
    </Focusable>
  )
}

export default Media
