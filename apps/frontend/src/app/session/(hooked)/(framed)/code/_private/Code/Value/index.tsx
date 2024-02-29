'use client'

import { type FC, memo } from 'react'

const Value: FC<{ raw?: string }> = ({ raw }) => {
  return (
    <span className="text-5xl font-extrabold font-mono tracking-[0.65ch] uppercase">
      {raw}
    </span>
  )
}

export default memo(Value)
