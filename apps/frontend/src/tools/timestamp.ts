const prettySeconds = (seconds: number) => {
  return {
    seconds: seconds % 60,
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
  }
}

export { prettySeconds }
