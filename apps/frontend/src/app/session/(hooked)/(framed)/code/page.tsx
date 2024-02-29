'use server'

import { NextPage } from 'next'

import { ComponentProps } from 'react'

import Code from './_private/Code'
import Peer from './_private/Peer'

import { _translator } from '@/i18n/translator'
import WelcomeLayout from '@/react/components/WelcomeLayout'

const Page: NextPage = async () => {
  const _t = await _translator('en')

  const instruction: ComponentProps<typeof Code>['instruction'] = {
    scan: await _t((m) => m.app.session.hooked.framed.code.scan),
    code: await _t((m) => m.app.session.hooked.framed.code.code),
  }

  return (
    <Peer>
      <WelcomeLayout>
        <Code instruction={instruction} />
      </WelcomeLayout>
    </Peer>
  )
}

export default Page
