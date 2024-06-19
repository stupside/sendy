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
        <article ref={ref} className="flex gap-x-3">
          {props.list.map((content) => {
            return (
              <Media
                id={content.id}
                key={content.id}
                title={content.title}
                poster={content.poster}
                duration={content.duration}
              />
            )
          })}
        </article>
      )}
    </FocusableBoundary>
  )
}

export default Medias
