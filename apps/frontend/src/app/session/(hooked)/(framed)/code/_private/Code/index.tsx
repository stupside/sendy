'use server'

import { type FC } from 'react'

const DEFAULT_KEY = '0000'

const Code: FC<{ raw?: string }> = ({ raw = DEFAULT_KEY }) => {
  return (
    <span className="text-5xl font-extrabold font-mono tracking-[0.65ch] uppercase">
      {raw}
    </span>
  )
}

export default Code
