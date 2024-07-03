'use client'

import { useContext } from 'react'

import norigin from '@noriginmedia/norigin-spatial-navigation'

import FocusContext from 'src/contexts/FocusContext'

const initFocusables = norigin.init

const useFocusContext = () => useContext(FocusContext)

export { initFocusables, useFocusContext }
