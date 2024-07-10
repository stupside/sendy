'use client'

import {
  FormEventHandler,
  KeyboardEventHandler,
  useCallback,
  type FC,
} from 'react'

import { Focusable } from '@sendy/react-spatial'

const Digit: FC<{
  name: string
  index: number
  value?: string
  placeholder: string
  controls: {
    next: () => void
    previous: () => void
  }
}> = ({ name, value, index, placeholder, controls }) => {
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Backspace') {
        if (event.currentTarget.value) return

        controls.previous()

        event.preventDefault()
      } else {
        event.currentTarget?.select()
      }
    },
    [controls.previous],
  )

  const onInput: FormEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.currentTarget.validity.patternMismatch) return

      if (event.currentTarget.value) {
        controls.next()
      }
    },
    [controls.next],
  )

  return (
    <Focusable>
      {({ ref }) => (
        <input
          step={1}
          required
          ref={ref}
          type="text"
          maxLength={1}
          value={value}
          onInput={onInput}
          pattern="[A-Za-z0-9]"
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          name={`${name}[${index}]`}
          autoComplete="one-time-code"
          className=" bg-zinc-800 ring-zinc-300 placeholder-shown:ring-zinc-600 placeholder:text-zinc-600 focus:motion-safe:animate-pulse focus:ring-zinc-200 outline-none rounded w-[2.5ch] caret-transparent ring-4 uppercase text-center py-3"
        />
      )}
    </Focusable>
  )
}

export default Digit
