'use client'

import { NextPage } from 'next'

import { ReactNode } from 'react'

import { useFormState } from 'react-dom'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { search } from './action'

const Layout: NextPage<{ status: ReactNode }> = (props) => {
  const [state, dispatch, pending] = useFormState(
    async (_: unknown, form: FormData) => {
      const data = await search(form)

      if (data?.results) {
        return data.results.map((item) => ({
          id: item.id,
          title: item.title,
          type: item.media_type,
          date: item.release_date,
          poster: item.poster_path,
        }))
      }

      return []
    },
    [],
  )

  return (
    <>
      {props.status}
      <div className="mx-auto max-w-md p-8 mt-16">
        <h1 className="text-3xl mb-12 font-bold text-center">
          What would you like to watch tonight?
        </h1>
        <form
          action={dispatch}
          className=" flex bg-zinc-700 rounded-full py-3 px-4"
        >
          <button type="submit" className="p-1">
            <MagnifyingGlassIcon className="h-5 w-5 stroke-[3]" />
          </button>
          <input
            type="text"
            name="name"
            placeholder="Search for a movie..."
            className="w-full bg-transparent px-3 outline-none"
          />
        </form>
      </div>
      {pending ? <p>Loading...</p> : JSON.stringify(state)}
    </>
  )
}

export default Layout
