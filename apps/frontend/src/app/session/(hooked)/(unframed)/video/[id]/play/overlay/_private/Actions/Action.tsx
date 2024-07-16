'use client'

import { type FC, type PropsWithChildren } from 'react'

import { useFocusable } from '@sendy/react-spatial'

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
      className={`font-bold rounded-md py-1 px-3 border-zinc-200 border-[1px] ${
        focused
          ? 'bg-zinc-200 text-black'
          : 'hover:bg-zinc-200 hover:text-black focus:bg-zinc-200 focus:text-black'
      }`}
    >
      {children}
    </button>
  )
}

export default Action
