'use client'

import { ComponentProps, FC } from 'react'

import { FocusableBoundary } from '@sendy/ui-navigation'

import Media from './Media'

const Medias: FC<{
  list: Array<ComponentProps<typeof Media>>
}> = (props) => {
  return (
    <FocusableBoundary>
      {({ ref }) => (
        <ul ref={ref} className="flex gap-x-3 w-max">
          {props.list.map((content) => {
            return (
              <li key={content.id}>
                <Media
                  id={content.id}
                  title={content.title}
                  poster={content.poster}
                  duration={content.duration}
                />
              </li>
            )
          })}
        </ul>
      )}
    </FocusableBoundary>
  )
}

export default Medias
