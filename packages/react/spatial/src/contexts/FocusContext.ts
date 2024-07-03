import { createContext, createRef } from 'react'

import norigin from '@noriginmedia/norigin-spatial-navigation'

type IFocusContext = norigin.UseFocusableResult

const FocusContext = createContext<IFocusContext>({
  focusKey: '',
  focused: false,
  ref: createRef(),
  focusSelf: () => {},
  hasFocusedChild: false,
})

export default FocusContext
