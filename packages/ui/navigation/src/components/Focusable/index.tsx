'use client'

import { useEffect, type FC } from 'react'

import norigin from '@noriginmedia/norigin-spatial-navigation'

const Focusable: FC<{
  focus?: boolean
  config?: norigin.UseFocusableConfig
  children: FC<ReturnType<typeof norigin.useFocusable>>
}> = ({ focus, config, children }) => {
  const focusable = norigin.useFocusable(config)

  useEffect(() => {
    if (focus) {
      focusable.focusSelf()
    }
  }, [focus, focusable])

  return children(focusable)
}

export default Focusable
