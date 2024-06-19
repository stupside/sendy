'use server'

import { NextPage } from 'next'

import { Digits } from '@sendy/ui-interactible'

import { MakeReq } from '@/tools/api'

import { handlePeer } from './action'

const Page: NextPage = async () => {
  const { data } = await MakeReq((c) => c.GET('/server/config'))

  if (data === undefined) {
    return <div>Could not load server config</div>
  }

  return (
    <form
      action={handlePeer}
      className="flex flex-col justify-center gap-y-5 mx-auto"
    >
      <Digits name="digits" length={data.code.len} />
      <button type="submit">Peer</button>
    </form>
  )
}

export default Page
