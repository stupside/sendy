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
      className={`rounded-md p-2 text-white ${
        focused
          ? 'bg-white text-black'
          : 'hover:bg-white focus:bg-white hover:text-black focus:text-black'
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
  const { ref, focused } = useFocusable()

  return (
    <Link
      ref={ref}
      href={href}
      title={title}
      className={`inline-block rounded-md p-2 text-white ${
        focused
          ? 'bg-white text-black'
          : 'hover:bg-white focus:bg-white hover:text-black focus:text-black'
      }`}
    >
      {children}
    </Link>
  )
}

export default Object.assign(Action, { Link: ActionLink })
