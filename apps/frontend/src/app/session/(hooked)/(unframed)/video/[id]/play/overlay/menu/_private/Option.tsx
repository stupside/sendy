'use client'

import { useCallback, type FC, type MouseEventHandler } from 'react'

import { CheckIcon } from '@heroicons/react/24/solid'

import { useFocusable } from '@sendy/react-spatial'

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

  const { ref, focused } = useFocusable({})

  return (
    <button
      ref={ref}
      id={name}
      value={id}
      title={name}
      onClick={onClick}
      className={`flex items-center gap-3 my-1 px-5 py-1 border-[1px] rounded-lg ${active ? 'bg-white text-black' : ''} ${focused ? '' : 'border-transparent'}`}
    >
      <div
        style={{
          visibility: active ? 'visible' : 'hidden',
        }}
      >
        <CheckIcon className="w-5 h-5 stroke-[3]" />
      </div>
      <div>{name}</div>
    </button>
  )
}

export default Option
