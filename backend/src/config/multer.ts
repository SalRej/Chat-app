import multer from 'fastify-multer'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop()
    const filename = `${uuidv4()}.${extension as string}`
    cb(null, filename)
  }
})
const upload = multer({ storage })

export default upload
