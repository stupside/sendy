'use client'

import { type FC, type PropsWithChildren } from 'react'

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'

const Modal: FC<
  PropsWithChildren<{
    open: boolean
    close: () => void
  }>
> = ({ open, close, children }) => {
  return (
    <Transition appear as={Dialog} show={open} onClose={close}>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {children}
          </TransitionChild>
        </div>
      </div>
    </Transition>
  )
}

export { Modal, DialogPanel as ModalPanel, DialogTitle as ModalTitle }
