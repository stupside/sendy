'use client'

import { type FC, type PropsWithChildren } from 'react'

import { useFocusable } from '@sendy/react-spatial'
import Link from 'next/link'

const Action: FC<
  PropsWithChildren<{
    title: string
    handle: () => void
  }>
> = ({ handle, title, children }) => {
  const { ref, focused } = useFocusable({})

  return (
    <button
      ref={ref}
      title={title}
      onClick={handle}
      className={`rounded-md p-2 ${
        focused
          ? 'bg-zinc-200 text-black'
          : 'hover:bg-zinc-200 hover:text-black focus:bg-zinc-200 focus:text-black bg-zinc-700'
      }`}
    >
      {children}
    </button>
  )
}

const ActionLink: FC<
  PropsWithChildren<{
    href: string
    title: string
  }>
> = ({ children, title, href }) => {
  const { ref, focused } = useFocusable({})

  return (
    <Link
      ref={ref}
      href={href}
      title={title}
      className={`inline-block rounded-md p-2 ${
        focused
          ? 'bg-zinc-200 text-black'
          : 'hover:bg-zinc-200 hover:text-black focus:bg-zinc-200 focus:text-black bg-zinc-700'
      }`}
    >
      {children}
    </Link>
  )
}

export default Object.assign(Action, { Link: ActionLink })
