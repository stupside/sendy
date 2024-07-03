'use client'

import { useCallback, type FC, type MouseEventHandler } from 'react'

import { CheckIcon } from '@heroicons/react/24/solid'

import { Focusable } from '@sendy/react-spatial'

const Option: FC<{
  id: number
  name: string
  active: boolean
  activate: (id: number) => void
}> = ({ id, name, active, activate }) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      activate(Number.parseInt(event.currentTarget.value))
    },
    [activate],
  )

  return (
    <>
      <div
        style={{
          visibility: active ? 'visible' : 'hidden',
        }}
      >
        <CheckIcon className="w-5 h-5 stroke-[3]" />
      </div>
      <div>
        <Focusable>
          {({ ref }) => (
            <button
              ref={ref}
              id={name}
              value={id}
              title={name}
              onClick={onClick}
            >
              {name}
            </button>
          )}
        </Focusable>
      </div>
    </>
  )
}

export default Option
