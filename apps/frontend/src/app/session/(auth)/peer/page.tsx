'use server'

import { NextPage } from 'next'

import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import Digits from './_private/Digits'
import { handle } from './action'

import { _translator } from '@/i18n/translator'
import WelcomeLayout from '@/react/components/WelcomeLayout'
import { sendy } from '@/tools/api'

const Page: NextPage<{ searchParams: Promise<{ data?: string }> }> = async (
  props,
) => {
  const { data } = await sendy((c) => c.GET('/server/config'))

  if (!data) return null

  const schema = Type.Object({
    code: Type.String({
      minLength: data.code.len,
      maxLength: data.code.len,
    }),
  })

  const searchParams = await props.searchParams

  const stringified = searchParams.data
    ? Buffer.from(searchParams.data, 'base64').toString()
    : undefined

  const json = stringified
    ? Value.Decode(schema, JSON.parse(stringified))
    : undefined

  const _t = await _translator('en')

  return (
    <WelcomeLayout>
      <form action={handle} className="flex flex-col gap-y-6">
        <div>
          <h1 className="text-xl font-bold mb-1">
            {await _t((m) => m.app.session.auth.peer.scan)}
          </h1>
          <p className="text-sm font-light mb-3">
            {await _t((m) => m.app.session.auth.peer.code)}
          </p>
        </div>
        <div>
          <Digits name="digits" length={data.code.len} value={json?.code} />
          <button type="submit" className="flex gap-x-3 mt-4">
            <span className="font-bold text-xl">
              {await _t((m) => m.app.session.auth.peer.peer)}
            </span>
            <ArrowLongRightIcon className="h-7 w-7 inline stroke-[3]" />
          </button>
        </div>
      </form>
    </WelcomeLayout>
  )
}

export default Page
