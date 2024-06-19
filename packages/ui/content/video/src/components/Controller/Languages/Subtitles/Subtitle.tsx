'use client'

import { type FC, type MouseEventHandler } from 'react'

import { CheckIcon } from '@heroicons/react/24/solid'

import { Focusable } from '@sendy/ui-navigation'

import { useVideoSubtitle } from 'src/hooks'

const Subtitle: FC<{ id: number; name: string }> = ({ id, name }) => {
  const { subtitle, changeSubtitle } = useVideoSubtitle()

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const value = event.currentTarget.value

    changeSubtitle(Number.parseInt(value))
  }

  return (
    <li className="flex items-center gap-3 my-1 ">
      <div
        style={{
          visibility: subtitle === id ? 'visible' : 'hidden',
        }}
      >
        <CheckIcon className="w-5 h-5 stroke-[3] text-zinc-200" />
      </div>
      <div>
        <Focusable>
          {({ ref }) => (
            <button
              ref={ref}
              title="subtitle"
              id={`subtitle-${id}`}
              value={id}
              onClick={onClick}
              className={`${subtitle === id && 'text-zinc-200'}`}
            >
              {name}
            </button>
          )}
        </Focusable>
      </div>
    </li>
  )
}

export default Subtitle
