'use server'

import { NextPage } from 'next'

import { MakeReq } from '@/tools/api'

import WelcomeLayout from '@/react/components/WelcomeLayout'

import { handlePeer } from './action'

import Digits from './_private/Digits'

const Page: NextPage<{ searchParams: { code?: string } }> = async (props) => {
  const { data } = await MakeReq((c) => c.GET('/server/config'))

  if (data === undefined) {
    return <div>Could not load server config</div>
  }

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
