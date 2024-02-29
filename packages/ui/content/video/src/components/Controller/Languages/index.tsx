import { type FC, useMemo, useState } from 'react'

import { Dialog } from '@sendy/ui-layout'
import { Button } from '@sendy/ui-interactible'

import { type ControllerFeatures } from '../Features'

import Audios from './Audios'
import Subtitles from './Subtitles'

const Languages: FC<{
  features: ControllerFeatures['language']
}> = ({ features }) => {
  const [open, setOpen] = useState(false)

  const AudioProvider = useMemo(
    () => typeof features?.Audio === 'function' && features.Audio,
    [features?.Audio],
  )

  const SubtitleProvider = useMemo(
    () => typeof features?.Subtitle === 'function' && features.Subtitle,
    [features?.Subtitle],
  )

  if ((AudioProvider && SubtitleProvider) == false) return null

  return (
    <>
      <Button
        title="Language"
        handle={() => {
          setOpen((opened) => !opened)
        }}
      >
        {AudioProvider ? 'Audio' : undefined}
        {AudioProvider && SubtitleProvider ? ' and ' : undefined}
        {SubtitleProvider ? 'Subtitles' : undefined}
      </Button>
      <Dialog
        open={open}
        title={<>Language</>}
        close={() => {
          setOpen(false)
        }}
      >
        <div className="flex flex-row gap-x-3">
          {AudioProvider && (
            <div className="flex flex-col">
              <div className="mb-3 font-bold text-lg">Audios</div>
              <AudioProvider>
                <Audios />
              </AudioProvider>
            </div>
          )}
          {SubtitleProvider && (
            <div className="flex flex-col">
              <div className="mb-3 font-bold text-lg">Subtitles</div>
              <SubtitleProvider>
                <Subtitles />
              </SubtitleProvider>
            </div>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default Object.assign(Languages, {
  Audios: Audios,
  Subtitles: Subtitles,
})
