import { type FC, type PropsWithChildren, type ReactElement } from 'react'

import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'

import DialogPanel from './Panel'

const Dialog: FC<
  PropsWithChildren<{
    open: boolean
    close: () => void
    title: ReactElement
  }>
> = ({ title, open, close, children }) => {
  return (
    <Transition appear as={HeadlessDialog} show={open} onClose={close}>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <Transition.Child
            as={DialogPanel}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <HeadlessDialog.Title as="h3" className="text-xl font-medium mb-2">
              {title}
            </HeadlessDialog.Title>
            {children}
          </Transition.Child>
        </div>
      </div>
    </Transition>
  )
}

export default Dialog
