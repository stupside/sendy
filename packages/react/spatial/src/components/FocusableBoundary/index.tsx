'use client'

import { useEffect, type FC } from 'react'

import norigin, {
  type UseFocusableResult,
} from '@noriginmedia/norigin-spatial-navigation'
import FocusContext from 'src/contexts/FocusContext'

const FocusableBoundary: FC<{
  lock?: boolean
  focus?: boolean
  focusable?: boolean
  children: FC<Partial<UseFocusableResult>>
}> = ({ focus, focusable = true, lock, children }) => {
  const context = norigin.useFocusable({
    focusable,
    trackChildren: true,
    isFocusBoundary: focusable && lock,
    extraProps: {
      lock,
      focusable,
    },
  })

  useEffect(() => {
    if (focus) {
      context.focusSelf()
    }
  }, [context.focusSelf, focus])

  return (
    <norigin.FocusContext.Provider value={context.focusKey}>
      <FocusContext.Provider value={context}>
        {children(context)}
      </FocusContext.Provider>
    </norigin.FocusContext.Provider>
  )
}

export default FocusableBoundary
