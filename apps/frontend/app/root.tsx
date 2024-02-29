import { type FC } from 'react'

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import { type LinksFunction, type MetaFunction } from '@remix-run/node'

import styles from './tailwind.css'

export const meta: MetaFunction = () => {
  return [
    {
      name: 'charset',
      content: 'utf-8',
    },
    {
      name: 'description',
      content: 'Fastack',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'title',
      content: 'Fastack',
    },
    {
      name: 'og:title',
      content: 'Fastack',
    },
    {
      name: 'og:description',
      content: 'Fastack',
    },
  ]
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

const App: FC = () => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className="flex h-screen w-full overflow-x-hidden">
        <Outlet />
        <Scripts />
        <LiveReload />
        <ScrollRestoration />
      </body>
    </html>
  )
}

export default App
