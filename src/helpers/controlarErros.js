import multer from 'multer'

export const controlarErros = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Erros relacionados ao multer (upload de arquivos)
    res.status(400).json({ message: `Erro no upload da imagem: ${err.message}` });
  } else if (err.name === 'ValidationError') {
    // Erros de validação do banco de dados (se houver)
    res.status(400).json({ message: `Erro de validação: ${err.message}` });
  } else {
    // Qualquer outro erro genérico
    res.status(500).json({ message: `Erro no servidor: ${err.message}` });
  }
}
