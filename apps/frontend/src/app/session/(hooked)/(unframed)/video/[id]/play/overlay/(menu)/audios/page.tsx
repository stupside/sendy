'use client'

import { NextPage } from 'next'

import { useVideoAudio } from '@sendy/react-media-video'

import Option from '../_private/Option'

const Page: NextPage = () => {
  const { audios, audio, change } = useVideoAudio()

  return (
    <ul>
      {Array.from(audios).map(({ id, name }) => (
        <li key={id}>
          <Option id={id} name={name} active={id === audio} activate={change} />
        </li>
      ))}
    </ul>
  )
}

export default Page
