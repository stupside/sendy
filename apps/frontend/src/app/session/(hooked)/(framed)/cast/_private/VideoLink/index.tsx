'use client'

import { FC, PropsWithChildren } from 'react'

import Link from 'next/link'

import { Focusable } from '@sendy/react-spatial'

const VideoLink: FC<
  PropsWithChildren<{
    id: number
  }>
> = (props) => {
  return (
    <Focusable>
      {({ ref, focused }) => (
        <Link
          prefetch
          ref={ref}
          href={'todo'}
          className={`relative block rounded-xl shadow-2xl overflow-hidden duration-100 ${focused ? 'scale-100' : 'scale-95'}`}
        >
          {props.children}
        </Link>
      )}
    </Focusable>
  )
}

export default VideoLink
