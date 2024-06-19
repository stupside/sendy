'use client'

import { type FC } from 'react'

import { useVideoSubtitle } from 'src/hooks'

import Subtitle from './Subtitle'

const Subtitles: FC = () => {
  const { subtitles } = useVideoSubtitle()

  return (
    <ul id="subtitles" className="mx-1">
      {Array.from(subtitles).map(({ id, name }) => (
        <Subtitle key={id} id={id} name={name} />
      ))}
    </ul>
  )
}

export default Subtitles
