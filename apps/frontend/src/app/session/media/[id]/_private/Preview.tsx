'use client'

import { FC } from 'react'

import Image from 'next/image'

import { PlayCircleIcon } from '@heroicons/react/24/solid'

import { Focusable } from '@sendy/ui-navigation'

const Preview: FC<{
  cover: string
}> = (props) => {
  return (
    <Focusable>
      {({ ref, focused }) => (
        <div
          ref={ref}
          className="relative h-full aspect-video rounded-lg shadow-2xl inline-flex justify-center items-center overflow-hidden"
        >
          {focused && <PlayCircleIcon className="w-12 h-12" />}
          <Image fill alt="Peview" src={props.cover} className="object-cover" />
        </div>
      )}
    </Focusable>
  )
}

export default Preview
