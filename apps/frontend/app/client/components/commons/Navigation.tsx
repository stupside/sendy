import { type FC } from 'react'

import { Link } from '@remix-run/react'

import { Focusable } from '@sendy/ui-navigation'

const Navigation: FC<{ to: string; title: string }> = ({ to, title }) => {
  return (
    <Focusable>
      {({ ref }) => (
        <Link
          to={to}
          ref={ref}
          title={title}
          className="text-zinc-600 text-2xl font-medium focus:text-zinc-200 hover:text-zinc-200"
        >
          {title}
        </Link>
      )}
    </Focusable>
  )
}

export default Navigation
