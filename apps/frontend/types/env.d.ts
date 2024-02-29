declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      TMDB_URL: string
      TMDB_TOKEN: string
      BACKEND_URL: string
      FRONTEND_URL: string
      STORAGE_SECRET: string
    }
  }
}

export {}
