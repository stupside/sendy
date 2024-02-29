'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import Buffering from './_private/Buffering'
import Controller from './_private/Controller'
import Video from './_private/Video'

import { _translator } from '@/i18n/translator'
import { sendy } from '@/tools/api'

const Layout: NextPage<
  PropsWithChildren<{
    params: Promise<{ id: number }>
  }>
> = async (props) => {
  const params = await props.params

  const { data } = await sendy((c) =>
    c.GET('/medias/{id}', {
      params: {
        path: {
          id: params.id,
        },
      },
    }),
  )

  if (!data) return null

  const _t = await _translator('en')

  return (
    <Video url={data.value} title="unknown" subtitle="unknown">
      <Controller>
        <Buffering
          id={params.id}
          message={await _t(
            (m) => m.app.session.hooked.unframed.video.player.loading,
          )}
        >
          {props.children}
        </Buffering>
      </Controller>
    </Video>
  )
}

export default Layout
