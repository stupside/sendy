'use server'

import { NextPage } from 'next'

import { Digits } from '@sendy/ui-typography'
import { QrCodeOutput } from '@sendy/ui-zxing'

import { MakeReq } from '@/tools/api'

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
      <section className="flex flex-col gap-y-3 my-auto m-auto md:ml-48">
        <h1 className="mb-12 text-3xl font-black">
          Empower your <br />
          <span className="text-green-400">streaming</span> experience
        </h1>
        <article className="flex gap-x-6">
          <div className="w-32 h-32">
            <QrCodeOutput qr={data.qr} />
          </div>
          <div className="my-auto">
            <h1 className="text-xl font-bold mb-1">Scan this QR code</h1>
            <p className="text-sm font-light mb-3">Or enter the key manually</p>
            <Digits raw={data.raw} />
          </div>
        </article>
        <CodeExpiry expiry={data.expiry} />
      </section>
      <CodeRedirectionOnPeer />
    </>
  )
}

export default Page
