'use client'

import {
  MutableRefObject,
  RefObject,
  createRef,
  useRef,
  useState,
  type FC,
} from 'react'

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
        <ul ref={ref} className="flex gap-x-4 text-3xl font-bold font-mono">
          {Array.from({
            length,
          }).map((_, index) => (
            <li key={index}>
              <Digit
                name={name}
                index={index}
                placeholder={ZERO_CHAR}
                value={value?.at(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </FocusableBoundary>
  )
}

export default Digits
