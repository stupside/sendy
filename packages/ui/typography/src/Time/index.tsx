import { type FC } from 'react'

const Time: FC<{ time: number }> = ({ time }) => {
  const minutes = Number((time / 60).toFixed())
  const seconds = time % 60

  const getDigits = (value: number) => (value < 10 ? `0${value}` : value)

  return (
    <span className="font-bold">
      {getDigits(minutes)}:{getDigits(seconds)}
    </span>
  )
}

export default Time
