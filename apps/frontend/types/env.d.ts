declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MY_BACKEND_URL: string
      MY_STORAGE_SECRET: string
    }
  }
}

export {}
