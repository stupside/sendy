'use client'

import { NextPage } from 'next'

import Option from '../_private/Option'

import { useVideoQuality } from '@sendy/react-media-video'

const Page: NextPage = () => {
  const { qualities, quality, change } = useVideoQuality()

  return (
    <ul>
      <li>
        <Option
          id={-1}
          name="Auto"
          activate={change}
          active={quality === null}
        />
      </li>
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
