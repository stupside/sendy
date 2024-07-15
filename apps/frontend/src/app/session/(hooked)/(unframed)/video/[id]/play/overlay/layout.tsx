'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

const Layout: NextPage<PropsWithChildren> = async (props) => {
  return <>{props.children}</>
}

export default Layout
