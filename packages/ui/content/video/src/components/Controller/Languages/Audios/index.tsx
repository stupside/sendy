import { type FC } from 'react'

import { useVideo } from 'src/hooks'

import Audio from './Audio'

const Audios: FC = () => {
  const { useVideoAudio } = useVideo()

  const { audios } = useVideoAudio()

  return (
    <ul id="audios" className="mx-1">
      {Array.from(audios).map(({ id, name }) => (
        <Audio key={id} id={id} name={name} />
      ))}
    </ul>
  )
}

export default Audios
