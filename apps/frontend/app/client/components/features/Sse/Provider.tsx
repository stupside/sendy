'use client'

import {
  type FC,
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react'

interface ISseContext {
  source?: EventSource
}

export const SseContext = createContext<ISseContext>({})

const Provider: FC<{ loader: string } & PropsWithChildren> = ({
  loader,
  children,
}) => {
  const [source, setSource] = useState<EventSource>()

  useEffect(() => {
    const source = new EventSource(loader, {
      withCredentials: true,
    })

    setSource(source)

    return () => {
      source.close()
    }
  }, [loader])

  return (
    <SseContext.Provider
      value={{
        source,
      }}
    >
      {children}
    </SseContext.Provider>
  )
}

export default Provider
