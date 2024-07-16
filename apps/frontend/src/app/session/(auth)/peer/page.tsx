'use server'

import { NextPage } from 'next'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

import { sendy } from '@/tools/api'

import WelcomeLayout from '@/react/components/WelcomeLayout'

import Digits from './_private/Digits'

import { handle } from './action'

const Page: NextPage<{ searchParams: { data?: string } }> = async (props) => {
  const { data } = await sendy((c) => c.GET('/server/config'))

  if (!data) return null

  const schema = Type.Object({
    code: Type.String({
      minLength: data.code.len,
      maxLength: data.code.len,
    }),
  })

  const stringified = props.searchParams.data
    ? Buffer.from(props.searchParams.data, 'base64').toString()
    : undefined

  const json = stringified
    ? Value.Decode(schema, JSON.parse(stringified))
    : undefined

  return (
    <WelcomeLayout>
      <form action={handle} className="flex flex-col gap-y-6">
        <div>
          <h1 className="text-xl font-bold mb-1">Scan this QR code</h1>
          <p className="text-sm font-light mb-3">Or enter the key manually</p>
        </div>
        <div>
          <Digits name="digits" length={data.code.len} value={json?.code} />
          <button type="submit" className="flex gap-x-3 mt-4">
            <span className="font-bold text-xl">Pair this device</span>
            <ArrowLongRightIcon className="h-7 w-7 inline stroke-[3]" />
          </button>
        </div>
      </form>
    </WelcomeLayout>
  )
}

export default Page
