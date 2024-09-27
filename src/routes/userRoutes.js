import express from 'express'
import { createUser, deleteUser, getImagen, getUserByID, getUsers, updateUser } from '../controllers/userControllers.js'
import { uploadImage } from '../config/multer.js'
import { controlarErros } from '../helpers/controlarErros.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserByID)
router.post('/', uploadImage.single('imagem'), createUser, controlarErros )
router.put('/:id', uploadImage.single('imagem'), updateUser, controlarErros)
router.delete('/:id/:name', deleteUser)
router.get('/:id/image', getImagen)

router.get('*', (req, res) => res.end('..user/POST: Não existe a rota'))
router.post('*', (req, res) => res.end('..user/GET: Não existe a rota'))
router.put('*', (req, res) => res.end('..user/PUT: Não existe a rota'))
router.delete('*', (req, res) => res.end('..user/DELETE: Não existe a rota'))

export default router;