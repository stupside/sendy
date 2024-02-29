'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { _translator } from '@/i18n/translator'

const Layout: NextPage<PropsWithChildren> = async ({ children }) => {
  const _t = await _translator('en')

  return (
    <>
      <header className="sticky flex justify-between items-center px-5 py-3">
        <h1 className="font-bold text-3xl">{await _t((m) => m.app.title)}</h1>
      </header>
      {children}
    </>
  )
}

export default Layout
