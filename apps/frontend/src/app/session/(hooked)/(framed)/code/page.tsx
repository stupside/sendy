'use server'

import { NextPage } from 'next'

import { QrCodeOutput } from '@sendy/react-zxing'

import { sendy } from '@/tools/api'

import WelcomeLayout from '@/react/components/WelcomeLayout'

import Code from './_private/Code'
import CodeExpiry from './_private/CodeExpiry'
import CodeRedirectionOnPeer from './_private/CodeRedirectionOnPeer'

const Page: NextPage = async () => {
  const { data } = await sendy((c) =>
    c.POST('/sessions/code', {
      cache: 'no-cache',
      body: {
        callback: `${process.env.FRONTEND_URL}/session/peer&`,
      },
    }),
  )

  if (data === undefined) return null

  return (
    <>
      <WelcomeLayout>
        <div className="flex gap-x-6">
          <div className="w-32 h-32">
            <QrCodeOutput qr={data.qrcode} />
          </div>
          <aside className="my-auto">
            <h1 className="text-xl font-bold mb-1">Scan this QR code</h1>
            <p className="text-sm font-light mb-3">Or enter the key manually</p>
            <Code raw={data.code} />
          </aside>
        </div>
        <CodeExpiry expiry={data.expiry} />
      </WelcomeLayout>
      <CodeRedirectionOnPeer />
    </>
  )
}

export default Page
