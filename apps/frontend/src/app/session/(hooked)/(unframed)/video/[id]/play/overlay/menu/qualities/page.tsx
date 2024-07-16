'use client'

import { NextPage } from 'next'

import { useVideoQuality } from '@sendy/react-media-video'

import Option from '../_private/Option'

const Page: NextPage = () => {
  const { qualities, quality, change } = useVideoQuality()

  return (
    <ul>
      {Array.from(qualities).map(({ id, name }) => (
        <li key={id}>
          <Option
            id={id}
            name={name}
            activate={change}
            active={id === quality}
          />
        </li>
      ))}
    </ul>
  )
}

export default Page
