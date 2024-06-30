'use client'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Modal, ModalPanel, ModalTitle } from '@sendy/ui-layout'

import { useVideoSubtitle } from '@sendy/ui-content-video'

import Option from '../_private/Option'

const Page: NextPage = () => {
  const { subtitles, subtitle, change } = useVideoSubtitle()

  const router = useRouter()

  return (
    <Modal
      open
      close={() => {
        router.back()
      }}
    >
      <ModalPanel>
        <ModalTitle>Subtitles</ModalTitle>
        <ul className="mx-1">
          {Array.from(subtitles).map(({ id, name }) => (
            <li key={id} className="flex items-center gap-3 my-1">
              <Option
                id={id}
                name={name}
                active={id === subtitle}
                activate={change}
              />
            </li>
          ))}
        </ul>
      </ModalPanel>
    </Modal>
  )
}

export default Page
