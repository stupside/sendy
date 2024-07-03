'use client'

import Link from 'next/link'

import { type FC, type PropsWithChildren } from 'react'

import { Focusable } from '@sendy/react-spatial'

const ButtonLink: FC<
  PropsWithChildren<{
    title: string
    redirection: string
  }>
> = ({ title, children, redirection }) => {
  return (
    <Focusable>
      {({ ref }) => (
        <Link
          prefetch
          ref={ref}
          title={title}
          href={redirection}
          className="font-bold bg-white text-zinc-700 rounded-md py-1 px-3"
        >
          {children}
        </Link>
      )}
    </Focusable>
  )
}

export default ButtonLink
