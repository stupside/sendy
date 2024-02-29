'use client'

import { NextPage } from 'next'

import Option from '../../_private/Option'

import { useVideoSubtitle } from '@sendy/react-media-video'

const Page: NextPage = () => {
  const { subtitles, subtitle, change } = useVideoSubtitle()

  return (
    <ul>
      <li>
        <Option
          id={-1}
          name="Disabled"
          activate={change}
          active={subtitle === null}
        />
      </li>
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
