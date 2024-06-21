'use server'

import { NextPage } from 'next'

import { ReactNode } from 'react'

import { MakeReq } from '@/tools/api'

import Overlay from './_private/Overlay'
import Fullscreen from './_private/Actions/Fullscreen'
import PictureInPicture from './_private/Actions/PictureInPicture'

const Layout: NextPage<{ menu: ReactNode; params: { id: number } }> = async (
  props,
) => {
  const { data } = await MakeReq((c) =>
    c.GET('/contents/{id}', {
      params: {
        path: {
          id: props.params.id,
        },
      },
    }),
  )

  if (data === undefined) {
    // return <div>Failed to fetch data</div>
  }

  return (
    <Overlay actions={[Fullscreen, PictureInPicture]}>{props.menu}</Overlay>
  )
}

export default Layout
