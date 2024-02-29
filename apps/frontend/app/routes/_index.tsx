import { type FC } from 'react'

import { Dialog } from '@fastack/ui-layout'

const PageComponent: FC = () => {
  return (
    <Dialog
      open
      close={() => {
        alert('close')
      }}
      title={<h1>Welcome to fastack</h1>}
    >
      This is a custom component from a rollup package
    </Dialog>
  )
}

export default PageComponent
