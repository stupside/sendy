'use client'

import Link from 'next/link'

import { FC, PropsWithChildren } from 'react'

import { useFocusable } from '@sendy/react-spatial'

const Action: FC<PropsWithChildren<{ redirection: string }>> = (props) => {
  const { ref, focused } = useFocusable({})

  return (
    <Link
      ref={ref}
      href={props.redirection}
      className={`block font-bold border-[1px] rounded-full py-1 px-8 ${focused ? 'bg-white text-black' : 'text-white'}`}
    >
      {props.children}
    </Link>
  )
}

export default Action
