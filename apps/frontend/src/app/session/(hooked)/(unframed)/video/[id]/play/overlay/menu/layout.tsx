'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

const Layout: NextPage<PropsWithChildren> = async (props) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-r flex justify-end items-center from-black/25 via-black/35 to-black/95 pr-8">
      {props.children}
    </div>
  )
}

export default Layout
