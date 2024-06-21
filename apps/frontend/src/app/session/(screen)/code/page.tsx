'use server'

import { NextPage } from 'next'

import { Digits } from '@sendy/ui-typography'
import { QrCodeOutput } from '@sendy/ui-zxing'

import { MakeReq } from '@/tools/api'

import WelcomeLayout from '@/react/components/WelcomeLayout'

import CodeExpiry from './_private/CodeExpiry'
import CodeRedirectionOnPeer from './_private/CodeRedirectionOnPeer'

const Page: NextPage = async () => {
  const { data } = await MakeReq((c) =>
    c.GET('/sessions/code', {
      cache: 'no-cache',
    }),
  )

  if (data === undefined) {
    return <div>Failed to fetch session code</div>
  }

  return (
    <>
      <WelcomeLayout>
        <div className="flex gap-x-6">
          <div className="w-32 h-32">
            <QrCodeOutput qr={data.qr} />
          </div>
          <aside className="my-auto">
            <h1 className="text-xl font-bold mb-1">Scan this QR code</h1>
            <p className="text-sm font-light mb-3">Or enter the key manually</p>
            <Digits raw={data.raw} />
          </aside>
        </div>
        <CodeExpiry expiry={data.expiry} />
      </WelcomeLayout>
      <CodeRedirectionOnPeer />
    </>
  )
}

export default Page
