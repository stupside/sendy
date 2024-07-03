import { useContext } from 'react'

import OverlayContext from 'src/contexts/OverlayContext'

const useOverlay = () => {
  return useContext(OverlayContext)
}

export default useOverlay
