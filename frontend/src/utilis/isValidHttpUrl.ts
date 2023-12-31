const isValidHttpUrl = (text: string): boolean => {
  let url
  try {
    url = new URL(text)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export default isValidHttpUrl
