'use client'

import { type FC } from 'react'

import { Focusable } from '@sendy/ui-navigation'

import { useVideo } from 'src/hooks'

const Quality: FC<{ id: number; name: string }> = ({ id, name }) => {
  const { useVideoQuality } = useVideo()

  const { quality, changeQuality } = useVideoQuality()

  return (
    <li className="flex items-center gap-3 my-1">
      <Focusable>
        {({ ref }) => (
          <button
            ref={ref}
            title="quality"
            id={`quality-${id}`}
            value={id}
            onClick={() => {
              changeQuality(id)
            }}
            className={`${quality === id && 'text-zinc-200'}`}
          >
            {name}
          </button>
        )}
      </Focusable>
    </li>
  )
}

export default Quality
