// Função para tratar erros específicos do multer
const manejarErrorArchivo = (err, req, res, next) => {
    if (err) {
      res.status(400).json({ message: err.message })
    } else {
      next()
    }
  }
  
  module.exports = manejarErrorArchivo
  