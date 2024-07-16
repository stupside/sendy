'use client'

import { NextPage } from 'next'

import { useVideoSubtitle } from '@sendy/react-media-video'

import Option from '../_private/Option'

const Page: NextPage = () => {
  const { subtitles, subtitle, change } = useVideoSubtitle()

  return (
    <ul>
      {Array.from(subtitles).map(({ id, name }) => (
        <li key={id}>
          <Option
            id={id}
            name={name}
            activate={change}
            active={id === subtitle}
          />
        </li>
      ))}
    </ul>
  )
}

export default Page
