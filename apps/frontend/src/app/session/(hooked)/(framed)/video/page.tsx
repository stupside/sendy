'use server'

import { NextPage } from 'next'

import { _translator } from '@/i18n/translator'

const Page: NextPage = async () => {
  const _t = await _translator('en')

  return (
    <div className="flex flex-grow items-center">
      <p className="font-bold text-2xl animate-pulse self-center w-full text-center">
        {await _t((m) => m.app.session.hooked.framed.video.waiting)}
      </p>
    </div>
  )
}

export default Page
