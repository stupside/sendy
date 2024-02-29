import { type FC } from 'react'

const QR_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

const Output: FC<{ qr?: string }> = ({ qr = QR_PLACEHOLDER }) => {
  return (
    <article className="flex relative w-40 h-40 items-center justify-center">
      <img
        src={qr}
        alt="Qr"
        className="flex-grow bg-zinc-200 rounded-2xl overflow-hidden"
      />
    </article>
  )
}

export default Output
