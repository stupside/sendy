'use client'

import { NextPage } from 'next'

import { useRouter } from 'next/navigation'

import { Modal, ModalPanel, ModalTitle } from '@sendy/react-layout'

import { useVideoQuality } from '@sendy/react-media-video'

import Option from '../_private/Option'

const Page: NextPage = () => {
  const { qualities, quality, change } = useVideoQuality()

  const router = useRouter()

  return (
    <Modal
      open
      close={() => {
        router.back()
      }}
    >
      <ModalPanel>
        <ModalTitle>Qualitites</ModalTitle>
        <ul className="mx-1">
          {Array.from(qualities).map(({ id, name }) => (
            <li key={id} className="flex items-center gap-3 my-1">
              <Option
                id={id}
                name={name}
                activate={change}
                active={id === quality}
              />
            </li>
          ))}
        </ul>
      </ModalPanel>
    </Modal>
  )
}

export default Page
