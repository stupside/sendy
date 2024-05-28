'use client'

import { type FC, useState } from 'react'

import { Dialog } from '@sendy/ui-layout'
import { Button } from '@sendy/ui-interactible'

import { useVideo } from 'src/hooks'

import Quality from './Quality'

const Qualities: FC = () => {
  const [open, setOpen] = useState(false)

  const { useVideoQuality } = useVideo()

  const { qualities } = useVideoQuality()

  return (
    <>
      <Button
        title="Quality"
        handle={() => {
          setOpen((opened) => !opened)
        }}
      >
        Quality
      </Button>
      <Dialog
        title={<>Qualities</>}
        open={open}
        close={() => {
          setOpen(false)
        }}
      >
        <ul id="qualities" className="mx-1 flex gap-x-3">
          {Array.from(qualities).map(({ id, name }, index) => (
            <Quality key={index} id={id} name={name} />
          ))}
        </ul>
      </Dialog>
    </>
  )
}

export default Qualities
