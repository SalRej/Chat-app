import { v4 as uuidv4 } from 'uuid'

const generateFileName = (extension: string): string => {
  return `${uuidv4()}.${extension}`
}

export default generateFileName
