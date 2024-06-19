'use client'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { ComponentProps, FC, useMemo } from 'react'

import { Focusable } from '@sendy/ui-navigation'

import { prettySeconds } from '@/tools/timestamp'

const Media: FC<{
  id: number
  title: string
  poster: string
  duration: number
}> = (props) => {
  const router = useRouter()

  const config: ComponentProps<typeof Focusable>['config'] = useMemo(
    () => ({
      onFocus: async () => {
        router.push(`/session/media/${props.id}`)
      },
    }),
    [router.push, props.id],
  )

  const age = prettySeconds(1000)

  return (
    <Focusable config={config}>
      {({ ref, focused }) => (
        <section
          ref={ref}
          style={{
            aspectRatio: focused ? '2/3' : '2/3',
          }}
          className={`relative w-36 rounded-xl shadow-2xl overflow-hidden duration-150 ${focused ? 'scale-100' : 'scale-[98%]'}`}
        >
          <Image
            fill
            src={props.poster}
            className="object-cover"
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
        </section>
      )}
    </Focusable>
  )
}

export default Media
