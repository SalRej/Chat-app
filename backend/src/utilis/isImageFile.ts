import getExtension from './getExtention'

const imageExtentions = ['png', 'jpg', 'gif', 'webp']

const isImageFile = (filename: string): boolean => {
  return imageExtentions.includes(getExtension(filename))
}

export default isImageFile
