import { useState, type FC, useEffect } from 'react'

import { Outlet, useNavigate } from '@remix-run/react'

import { Dialog } from '@sendy/ui-layout'

import { Button } from '@sendy/ui-interactible'

import useSse, { type SseEventMap } from '~/client/hooks/useSse'

const PageComponent: FC = () => {
  const navigate = useNavigate()

  const [castable, setCastable] = useState<SseEventMap['/content/cast']>()

  useSse({
    connector: {
      event: '/content/cast',
      handler: async (castable) => {
        setCastable(castable)
      },
    },
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (castable) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [castable])

  return (
    <>
      <Dialog
        open={open}
        title={<h1>New {castable?.type} ready</h1>}
        close={() => {
          setOpen(false)
        }}
      >
        <div className="flex flex-col gap-y-3">
          <h2>New content arrived !</h2>
          <div className="flex gap-x-5">
            <Button
              title="Cast"
              handle={() => {
                navigate(
                  `/app/displayer/cast/${castable?.id}/${castable?.type}`,
                  {
                    replace: true,
                  },
                )
              }}
            >
              Cast
            </Button>
            <Button
              title="Ignore"
              handle={() => {
                setOpen(false)
              }}
            >
              Ignore
            </Button>
          </div>
        </div>
      </Dialog>
      <Outlet />
    </>
  )
}

export default PageComponent
