'use client'

import { useEffect, type FC } from 'react'

import norigin from '@noriginmedia/norigin-spatial-navigation'

import FocusContext from 'src/contexts/FocusContext'

const Focusable: FC<{
  focus?: boolean
  config?: norigin.UseFocusableConfig
  children: FC<Partial<norigin.UseFocusableResult>>
}> = ({ focus, config, children }) => {
  const context = norigin.useFocusable(config)

  useEffect(() => {
    if (focus) {
      context.focusSelf()
    }
  }, [focus, context])

  return (
    <FocusContext.Provider value={context}>
      {children(context)}
    </FocusContext.Provider>
  )
}

export default Focusable
