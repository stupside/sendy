import { type FC, type MouseEventHandler } from 'react'

import { CheckIcon } from '@heroicons/react/24/solid'

import { Focusable } from '@sendy/ui-navigation'

import { useVideo } from 'src/hooks'

const Audio: FC<{ id: number; name: string }> = ({ id, name }) => {
  const { useVideoAudio } = useVideo()

  const { audio, changeAudio } = useVideoAudio()

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const value = event.currentTarget.value

    changeAudio(Number.parseInt(value))
  }

  return (
    <li className="flex items-center gap-3 my-1">
      <div
        style={{
          visibility: audio === id ? 'visible' : 'hidden',
        }}
      >
        <CheckIcon className="w-5 h-5 stroke-[3] text-zinc-200" />
      </div>
      <div>
        <Focusable>
          {({ ref }) => (
            <button
              ref={ref}
              title="audio"
              id={`audio-${id}`}
              value={id}
              onClick={onClick}
              className={`${audio === id && 'text-zinc-200'}`}
            >
              {name}
            </button>
          )}
        </Focusable>
      </div>
    </li>
  )
}

export default Audio
