declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BACKEND_URL: string
      STORAGE_SECRET: string
    }
  }
}

export {}
