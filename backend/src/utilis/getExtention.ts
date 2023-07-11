const getExtension = (filename: string): string => {
  const parts = filename.split('.')
  if (parts.length === 1) {
    return '' // No extension found
  }
  return parts[parts.length - 1].toLowerCase()
}

export default getExtension
