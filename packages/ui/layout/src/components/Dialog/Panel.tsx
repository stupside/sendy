'use client'

import { DialogPanel } from '@headlessui/react'

import { forwardRef, type PropsWithChildren } from 'react'

const Panel = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <DialogPanel
        ref={ref}
        className="max-w-md transform overflow-hidden transition-all bg-zinc-100 p-5 rounded-md text-zinc-800"
      >
        {children}
      </DialogPanel>
    )
  },
)

export default Panel
