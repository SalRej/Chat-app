const getTimeSince = (date: string): string => {
  if (!date) {
    return 'Invalid date'
  }

  const now = new Date()
  const then = new Date(date)

  const timeDiff = (now.getTime() - then.getTime())

  const minutes = Math.floor(timeDiff / (1000 * 60))
  if (minutes < 60) {
    return `${minutes}m`
  }

  const hours = Math.floor(timeDiff / (1000 * 60 * 60))
  if (hours < 24) {
    return `${hours}h`
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  return `${days}d`
}

export default getTimeSince
