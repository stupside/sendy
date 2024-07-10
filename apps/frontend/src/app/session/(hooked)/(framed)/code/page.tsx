'use server'

import { networkInterfaces } from 'os'

import { NextPage } from 'next'

import { QrCodeOutput } from '@sendy/react-zxing'

import { sendy } from '@/tools/api'

import WelcomeLayout from '@/react/components/WelcomeLayout'

import Peer from './_private/Peer'

import Code from './_private/Code'
import CodeExpiry from './_private/CodeExpiry'

const interfaces = networkInterfaces()

const address = interfaces['Wi-Fi']?.find((i) => i.family === 'IPv4')?.address

const Page: NextPage = async () => {
  const { data } = await sendy((c) =>
    c.POST('/sessions/code', {
      cache: 'no-cache',
      body: {
        callback: `http://${address}:${process.env.PORT}/session/peer?data=`,
      },
    }),
  )

  if (data === undefined) return null

  return (
    <Peer>
      <WelcomeLayout>
        <div className="flex gap-x-6">
          <div className="w-32 h-32">
            <QrCodeOutput key={data.code} qr={data.qrcode} />
          </div>
          <aside className="my-auto">
            <h1 className="text-xl font-bold mb-1">Scan this QR code</h1>
            <p className="text-sm font-light mb-3">Or enter the key manually</p>
            <Code key={data.code} raw={data.code} />
          </aside>
        </div>
        <CodeExpiry expiry={data.expiry} />
      </WelcomeLayout>
    </Peer>
  )
}

export default Page
