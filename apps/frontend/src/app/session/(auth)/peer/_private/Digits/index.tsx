'use client'

import { useCallback, useMemo, useRef, type FC } from 'react'

import { useFocusable, FocusContext } from '@sendy/react-spatial'

import Digit from './Digit'

const ZERO_CHAR = '0'

const Digits: FC<{
  name: string
  length: number
  value?: string
}> = ({ name, value, length }) => {
  const digits = useRef<Array<HTMLLIElement | null>>([])

  const focus = useCallback(
    (direction: 'next' | 'previous') => {
      const index = digits.current.findIndex(
        (element) => element?.firstChild === document.activeElement,
      )

      const current = digits.current[index]

      if (current) {
        const next = digits.current[index + (direction === 'next' ? 1 : -1)]

        if (next?.firstChild instanceof HTMLInputElement) {
          next.firstChild.focus()
        }
      }
    },
    [digits.current],
  )

  const controls = useMemo(
    () => ({
      next: () => focus('next'),
      previous: () => focus('previous'),
    }),
    [focus],
  )

  const { ref, focusKey } = useFocusable({})

  return (
    <FocusContext.Provider value={focusKey}>
      <ul ref={ref} className="flex gap-x-4 text-3xl font-bold font-mono">
        {Array.from({
          length,
        }).map((_, index) => (
          <li
            key={index}
            ref={(ref) => {
              digits.current[index] = ref
            }}
          >
            <Digit
              name={name}
              index={index}
              controls={controls}
              placeholder={ZERO_CHAR}
              value={value?.at(index)}
            />
          </li>
        ))}
      </ul>
    </FocusContext.Provider>
  )
}

export default Digits
