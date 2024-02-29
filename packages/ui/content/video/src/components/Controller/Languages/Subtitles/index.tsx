import { type FC } from 'react'

import { useVideo } from 'src/hooks'

import Subtitle from './Subtitle'

const Subtitles: FC = () => {
  const { useVideoSubtitle } = useVideo()

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
