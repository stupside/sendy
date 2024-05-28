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

const Provider: FC<PropsWithChildren<{ src: string }>> = ({
  src,
  children,
}) => {
  const [source, setSource] = useState<EventSource>()

  useEffect(() => {
    const source = new EventSource(src, {
      withCredentials: true,
    })

    setSource(source)

    return () => {
      source.close()
    }
  }, [src])

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
