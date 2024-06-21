'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { getMockedContents } from '@/tools/mock'

import Preview from './_private/Preview'

const Page: NextPage<PropsWithChildren<{ params: { id: number } }>> = async (
  props,
) => {
  const media = (await getMockedContents()).at(props.params.id)!

  return (
    <>
      {props.children}
      <Preview id={props.params.id} cover={media.image.cover} />
    </>
  )
}

export default Page
