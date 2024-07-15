'use client'

import { type FC, type PropsWithChildren, useLayoutEffect } from 'react'

import { init } from '@noriginmedia/norigin-spatial-navigation'

const FocusableInitialization: FC<
  PropsWithChildren<{
    config: Parameters<typeof init>[0]
  }>
> = (props) => {
  useLayoutEffect(() => {
    init(props.config)
  }, [init, props.config])

  return <>{props.children}</>
}

export default FocusableInitialization
