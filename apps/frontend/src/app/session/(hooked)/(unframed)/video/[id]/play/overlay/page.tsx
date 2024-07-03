'use client'

import { NextPage } from 'next'

import Overlay from './_private/Overlay'

import Fullscreen from './_private/Actions/Fullscreen'
import PictureInPicture from './_private/Actions/PictureInPicture'

const Page: NextPage<{ params: { id: number } }> = (props) => {
  return (
    <Overlay id={props.params.id} actions={[Fullscreen, PictureInPicture]} />
  )
}

export default Page
