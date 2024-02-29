import { type FC, useRef } from 'react'

import { FocusableBoundary } from '@sendy/ui-navigation'

import Digit from './Digit'

const Digits: FC<{
  placeholder: string
  onChange: (digits: Array<string>, ok: boolean) => void
}> = ({ placeholder, onChange }) => {
  const digits = useRef<Array<string>>(
    Array.from({
      length: placeholder.length,
    }),
  )

  return (
    <FocusableBoundary lock={false}>
      {({ ref }) => (
        <article
          ref={ref}
          className="flex gap-x-4 text-3xl font-bold font-mono"
        >
          {digits.current.map((_, index) => {
            return (
              <Digit
                key={index}
                placeholder={placeholder[index]!}
                onChange={(digit) => {
                  digits.current[index] = digit

                  onChange(
                    digits.current,
                    digits.current.length === placeholder.length,
                  )
                }}
              />
            )
          })}
        </article>
      )}
    </FocusableBoundary>
  )
}

export default Digits
