'use client'

import { type FC, type PropsWithChildren, useInsertionEffect } from 'react'

import { init } from '@noriginmedia/norigin-spatial-navigation'

type Config = Parameters<typeof init>[0]

const FocusableInitialization: FC<
  PropsWithChildren<{
    config: Config
  }>
> = (props) => {
  useInsertionEffect(() => {
    init(props.config)
  }, [init, props.config])

  return props.children
}

export default FocusableInitialization
