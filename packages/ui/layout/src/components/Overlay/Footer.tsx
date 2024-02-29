import type { FC, PropsWithChildren } from 'react'

import { FocusableBoundary } from '@sendy/ui-navigation'

const OverlayFooter: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FocusableBoundary>
      {({ ref }) => (
        <footer ref={ref} className="flex flex-row justify-center gap-x-6">
          {children}
        </footer>
      )}
    </FocusableBoundary>
  )
}

export default OverlayFooter
