'use server'

import { NextPage } from 'next'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { sendy } from '@/tools/api'

import WelcomeLayout from '@/react/components/WelcomeLayout'

import Digits from './_private/Digits'

import { handle } from './action'

const Page: NextPage<{ searchParams: { data?: string } }> = async (props) => {
  const { data } = await sendy((c) => c.GET('/server/config'))

  if (data === undefined) return null

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
      <form action={handle}>
        <Digits name="digits" length={data.code.len} value={json?.code} />
        <button type="submit" className="mt-3">
          Peer
        </button>
      </form>
    </WelcomeLayout>
  )
}

export default Page
