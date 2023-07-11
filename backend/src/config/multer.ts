import multer from 'fastify-multer'
import generateFileName from '../utilis/generateFileName'

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop()
    const filename = generateFileName(extension as string)
    cb(null, filename)
  }
})
const upload = multer({ storage })

export default upload
