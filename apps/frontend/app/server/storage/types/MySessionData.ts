type MySessionData = {
  context: {
    token: string
    device: number
    session: number
  }
  csrf: string
}

export { type MySessionData }
