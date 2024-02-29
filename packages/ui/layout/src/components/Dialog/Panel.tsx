import { Dialog } from '@headlessui/react'

import { forwardRef, type PropsWithChildren } from 'react'

const DialogPanel = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <Dialog.Panel
        ref={ref}
        className="max-w-md transform overflow-hidden transition-all bg-zinc-100 p-5 rounded-md text-zinc-800"
      >
        {children}
      </Dialog.Panel>
    )
  },
)

export default DialogPanel
