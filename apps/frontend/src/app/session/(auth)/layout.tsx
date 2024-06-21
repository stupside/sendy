'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="sticky flex justify-between items-center px-5 py-3">
        <h1 className="font-bold text-3xl">Sendy</h1>
      </header>
      {children}
    </>
  )
}

export default Layout
