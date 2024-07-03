'use client'

import { ComponentProps, FC, PropsWithChildren, useMemo } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { Focusable } from '@sendy/react-spatial'

const Media: FC<
  PropsWithChildren<{
    id: number
  }>
> = (props) => {
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

  return (
    <Focusable config={config}>
      {({ ref, focused }) => (
        <Link
          prefetch
          ref={ref}
          href={redirection}
          className={`relative block rounded-xl shadow-2xl overflow-hidden duration-100 ${focused ? 'scale-100' : 'scale-95'}`}
        >
          {props.children}
        </Link>
      )}
    </Focusable>
  )
}

export default Media
