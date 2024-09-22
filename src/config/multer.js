import multer from 'multer'
import path from 'path'
import { __dirname } from '../utils/utils.js'

// Configuração de armazenamento para fotos de usuarios
const storagePhotoUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/user_photo'))
  },
  filename: function (req, file, cb) {
    const nomeDoArquivo = `${Date.now()}-${file.originalname}`
    cb(null, nomeDoArquivo)
  }
})
// Filtro para tipos de arquivos aceitos
const imageFilter = (req, file, cb) => {
  const mimePermitidos = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/webp']

  if (mimePermitidos.includes(file.mimetype)) {
    return cb(null, true)
  } else {
    cb(new Error('Tipo de arquivo não permitido. Apenas PNG, JPEG, GIF, BMP, e WEBP são aceitos.'))
  }
}
export const uploadImage = multer({ 
  storage: storagePhotoUser, 
  fileFilter: imageFilter, 
  limits: { fileSize: 10 * 1024 * 1024 }  // Limite de tamanho de arquivo: 10MB
})

// Configuração de armazenamento para qualquer arquivo
const storageAnyFile = multer.diskStorage({
  destination: function (req, file, cb)  {
    cb(null, path.join(__dirname, '../uploads/file_path'))
  },
  filename: function (req, file, cb)  {
    const nomeDoArquivo = `${Date.now()}-${file.originalname}`
    cb(null, nomeDoArquivo)
  }
})
// Não há filtro de tipos de arquivo, qualquer arquivo será aceito. Na realidade pode ser apagado
const fileFilter = (req, file, cb) => {
  cb(null, true)
}

export const uploadAnyFile = multer({ 
  storage: storageAnyFile, 
  fileFilter: fileFilter,
  limits: { fileSize: 29 * 1024 * 1024 } // Limite de tamanho de arquivo: 29MB
})