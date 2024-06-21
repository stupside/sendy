'use client'

import { type FC, type PropsWithChildren } from 'react'

import { Focusable } from '@sendy/ui-navigation'

const Button: FC<
  PropsWithChildren<{
    title: string
    handle: () => void
  }>
> = ({ handle, title, children }) => {
  return (
    <Focusable>
      {({ ref }) => (
        <button
          ref={ref}
          title={title}
          onClick={handle}
          className="font-bold bg-white text-zinc-700 rounded-md py-1 px-3"
        >
          {children}
        </button>
      )}
    </Focusable>
  )
}

export default Button
