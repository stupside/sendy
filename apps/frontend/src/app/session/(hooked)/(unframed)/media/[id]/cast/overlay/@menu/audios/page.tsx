'use client'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Modal, ModalPanel, ModalTitle } from '@sendy/ui-layout'

import * as Hls from '@sendy/ui-content-video-hls'

import { useVideoAudio } from '@sendy/ui-content-video'

import Option from '../_private/Option'

const Page: NextPage = () => {
  const { audios, audio, changeAudio } = useVideoAudio()

  const router = useRouter()

  return (
    <Modal
      open
      close={() => {
        router.back()
      }}
    >
      <ModalPanel>
        <ModalTitle>Audios</ModalTitle>
        <ul className="mx-1">
          {Array.from(audios).map(({ id, name }) => (
            <li key={id} className="flex items-center gap-3 my-1">
              <Option
                id={id}
                name={name}
                active={id === audio}
                activate={changeAudio}
              />
            </li>
          ))}
        </ul>
      </ModalPanel>
    </Modal>
  )
}

export default Page
