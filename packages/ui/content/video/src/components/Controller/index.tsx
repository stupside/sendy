'use client'

import { type FC, type PropsWithChildren } from 'react'

import { Overlay } from '@sendy/ui-layout'

import Display from './Display'
import Timeline from './Timeline'
import Qualities from './Qualities'
import Languages from './Languages'

import type { ControllerFeatures } from './Features'

const Controller: FC<{
  title?: string
  features: ControllerFeatures<FC<PropsWithChildren>>
}> = ({
  title,
  features: {
    quality,
    language,
    display = {
      pip: true,
      fullscreen: true,
    },
  },
}) => {
  return (
    <Overlay
      timeout={5000}
      HeaderContent={() => {
        return <h1 className="text-xl font-medium text-zinc-200">{title}</h1>
      }}
      FooterContent={() => {
        return (
          <>
            <section className="flex items-center gap-x-8">
              <Timeline />
            </section>
            <section className="flex justify-center gap-x-6">
              {typeof quality?.Provider === 'function' && (
                <quality.Provider>
                  <Qualities />
                </quality.Provider>
              )}
              <Languages features={language} />
              <Display features={display} />
            </section>
          </>
        )
      }}
    />
  )
}

export { Controller, type ControllerFeatures }

export { Display, Timeline, Languages, Qualities }
