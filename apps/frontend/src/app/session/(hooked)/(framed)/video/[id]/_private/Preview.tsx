'use client'

import { ComponentProps, FC, useCallback, useMemo } from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { PlayCircleIcon } from '@heroicons/react/24/solid'

import { Focusable } from '@sendy/react-spatial'

const play = (id: number) => `/session/video/${id}/play`

const Preview: FC<{
  id: number
  cover: string
}> = (props) => {
  const router = useRouter()

  const onEnterPress = useCallback(() => {
    router.push(play(props.id))
  }, [router.push, props.id])

  const config: ComponentProps<typeof Focusable>['config'] = useMemo(
    () => ({
      onEnterPress,
    }),
    [onEnterPress],
  )

  return (
    <Focusable config={config}>
      {({ ref, focused }) => (
        <Link
          ref={ref}
          href={play(props.id)}
          className={`relative aspect-video shadow-2xl inline-flex justify-center items-center outline-none duration-100 ${focused ? 'scale-100' : 'scale-90'}`}
        >
          <PlayCircleIcon className="w-12 h-12" />
          <Image
            priority
            alt="Peview"
            quality={40}
            width={720}
            height={480}
            src={props.cover}
            className="absolute rounded-lg -z-10"
          />
        </Link>
      )}
    </Focusable>
  )
}

export default Preview
