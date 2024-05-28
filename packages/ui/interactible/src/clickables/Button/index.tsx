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
          type="button"
          title={title}
          className="flex items-center bg-zinc-700 text-zinc-200 focus:bg-zinc-200 hover:bg-zinc-200 focus:text-black hover:text-black rounded-md py-1 px-3"
          onClick={handle}
        >
          <span className="font-bold">{children}</span>
        </button>
      )}
    </Focusable>
  )
}

export default Button
