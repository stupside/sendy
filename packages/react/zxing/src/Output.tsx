'use client'

import { type FC } from 'react'

const QR_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

const Output: FC<{ qr?: string }> = ({ qr = QR_PLACEHOLDER }) => {
  return (
    <img
      src={qr}
      alt="Qr"
      className="h-full w-full rounded-xl overflow-hidden"
    />
  )
}

export default Output
