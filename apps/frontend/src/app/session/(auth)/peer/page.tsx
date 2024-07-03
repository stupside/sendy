'use server'

import { NextPage } from 'next'

import { sendy } from '@/tools/api'

import WelcomeLayout from '@/react/components/WelcomeLayout'

import { handlePeer } from './action'

import Digits from './_private/Digits'

const Page: NextPage<{ searchParams: { code?: string } }> = async (props) => {
  const { data } = await sendy((c) => c.GET('/server/config'))

  if (data === undefined) throw new Error('Could not fetch data')

  return (
    <WelcomeLayout>
      <form action={handlePeer}>
        <Digits
          name="digits"
          length={data.code.len}
          value={props.searchParams.code}
        />
        <button type="submit" className="mt-3">
          Peer
        </button>
      </form>
    </WelcomeLayout>
  )
}

export default Page
