import multer from 'multer'

export const controlarErros = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: `Erro no upload da imagem: ${err.message}` });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ message: `Erro de validação: ${err.message}` });
  } else {
    res.status(500).json({ message: `Erro no servidor: ${err.message}` });
  }
}
