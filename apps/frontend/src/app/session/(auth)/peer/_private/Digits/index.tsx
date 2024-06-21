'use client'

import { type FC } from 'react'

import { FocusableBoundary } from '@sendy/ui-navigation'

import Digit from './Digit'

const ZERO_CHAR = '0'

const Digits: FC<{
  name: string
  length: number
  value?: string
}> = ({ name, value, length }) => {
  return (
    <FocusableBoundary lock>
      {({ ref }) => (
        <article
          ref={ref}
          className="flex gap-x-4 text-3xl font-bold font-mono"
        >
          {Array.from({
            length,
          }).map((_, index) => (
            <Digit
              key={index}
              name={name}
              index={index}
              value={value?.at(index)}
              placeholder={ZERO_CHAR}
            />
          ))}
        </article>
      )}
    </FocusableBoundary>
  )
}

export default Digits
