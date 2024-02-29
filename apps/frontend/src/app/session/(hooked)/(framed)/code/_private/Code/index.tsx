'use client'

import { FC, useCallback, useLayoutEffect, useState } from 'react'

import { code } from '../../action'
import Timer from './Timer'
import Value from './Value'

import { QrCodeOutput } from '@sendy/react-zxing'

const Code: FC<{
  instruction: {
    scan: string
    code: string
  }
}> = ({ instruction }) => {
  const [data, setData] = useState<Awaited<ReturnType<typeof code>>>()

  if (!data) return null

  const refresh = useCallback(async () => {
    code().then(setData)
  }, [])

  useLayoutEffect(() => {
    refresh()
  }, [refresh])

  return (
    <>
      <div className="flex gap-x-6">
        <div className="w-32 h-32">
          <QrCodeOutput qr={data.qrcode} />
        </div>
        <aside className="my-auto">
          <h1 className="text-xl font-bold mb-1">{instruction.scan}</h1>
          <p className="text-sm font-light mb-3">{instruction.code}</p>
          <Value raw={data.code} />
        </aside>
      </div>
      <Timer key={data.code} expiry={data.expiry} onTimeout={refresh} />
    </>
  )
}

export default Code
