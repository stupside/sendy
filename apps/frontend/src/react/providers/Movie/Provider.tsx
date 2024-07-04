"use client"

import { createContext, FC, PropsWithChildren } from "react"

interface IMediaContext {
    id: number,
    xmdb: {
        id: string
        title: string
        duration: string
        media: {
            cover: string,
            background: string
        }
    }
}

const MediaContext = createContext<IMediaContext>({} as IMediaContext)

const MediaContextProvider: FC<PropsWithChildren<{value: IMediaContext}>> = (props) => {
    return <MediaContext.Provider value={props.value}>
        {props.children}
    </MediaContext.Provider>
}

export default MediaContextProvider