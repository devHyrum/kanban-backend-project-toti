import multer from 'multer'
import path from 'path'

// Configuração de armazenamento dos arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // Nome do arquivo com timestamp
  }
})

// Cria o middleware multer com a configuração definida
const upload = multer({ storage: storage })

module.exports = upload
