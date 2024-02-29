'use server'

import { NextPage } from 'next'

import { ReactNode } from 'react'

import { _translator } from '@/i18n/translator'

const Layout: NextPage<{ audios: ReactNode; subtitles: ReactNode }> = async (
  props,
) => {
  const _t = await _translator('en')

  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">
        {await _t(
          (m) =>
            m.app.session.hooked.unframed.video.player.overlay.settings
              .languages,
        )}
      </h1>
      <div className="flex gap-x-12">
        <div>
          <h2 className="font-semibold text-xl">
            {await _t(
              (m) =>
                m.app.session.hooked.unframed.video.player.overlay.settings
                  .audios,
            )}
          </h2>
          <div>{props.audios}</div>
        </div>
        <div>
          <h2 className="font-semibold text-xl">
            {await _t(
              (m) =>
                m.app.session.hooked.unframed.video.player.overlay.settings
                  .subtitles,
            )}
          </h2>
          <div>{props.subtitles}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
