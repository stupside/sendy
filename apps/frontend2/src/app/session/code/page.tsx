'use server'

import { NextPage } from 'next'

import { Digits } from '@sendy/ui-typography'
import { QrCodeOutput } from '@sendy/ui-zxing'

import { MakeReq } from '@/tools/api'

import CodeExpiry from './_components/CodeExpiry'
import CodeRedirectionOnPeer from './_components/CodeRedirectionOnPeer'

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
      <section className="flex items-center gap-x-24 m-auto">
        <article className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-3">
            <h1 className="text-3xl font-medium">Scan the QR code</h1>
            <h2 className="text-xl font-medium text-zinc-200">
              Or enter the key manually
            </h2>
          </div>
          <Digits raw={data.raw} />
          <CodeExpiry expiry={data.expiry} />
        </article>
        <QrCodeOutput qr={data.qr} />
      </section>
      <CodeRedirectionOnPeer />
    </>
  )
}

export default Page
