import { type FC } from 'react'

import { Focusable } from '@sendy/ui-navigation'

const Digit: FC<{
  placeholder: string
  onChange: (digit: string) => void
}> = ({ placeholder, onChange }) => {
  return (
    <Focusable>
      {({ ref }) => (
        <input
          ref={ref}
          type="text"
          maxLength={1}
          placeholder={placeholder}
          autoComplete="one-time-code"
          onKeyDown={(event) => {
            if (event.key === 'Backspace') {
              if (event.currentTarget.value) return

              event.preventDefault()

              const previous = event.currentTarget
                .previousElementSibling as HTMLInputElement | null

              previous?.focus()
            } else {
              event.currentTarget?.select()
            }
          }}
          onInput={({ currentTarget }) => {
            onChange(currentTarget.value)

            const next = (
              currentTarget.value?.length
                ? currentTarget.nextElementSibling
                : currentTarget.previousElementSibling
            ) as HTMLInputElement | null

            next?.focus()
          }}
          className=" bg-zinc-800 ring-zinc-300 placeholder-shown:ring-zinc-600 placeholder:text-zinc-600 focus:motion-safe:animate-pulse focus:ring-zinc-200 outline-none rounded w-[2.5ch] caret-transparent ring-4 uppercase text-center py-3"
        />
      )}
    </Focusable>
  )
}

export default Digit
