'use server'

import { type FC } from 'react'

const getDigits = (value: number) => {
  return value < 10 ? `0${value}` : value
}

const Time: FC<{ time: number }> = ({ time }) => {
  const minutes = Number((time / 60).toFixed())

  return (
    <span>
      {getDigits(minutes)}:{getDigits(time % 60)}
    </span>
  )
}

export default Time
