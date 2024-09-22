import express from 'express'
import { createTask, deleteTask, editTask, getTaskById, getTasks,  } from '../controllers/taskControllers.js'
import { uploadAnyFile } from '../config/multer.js'
import { controlarErros } from '../helpers/controlarErros.js'


const router = express.Router()

router.get('/', getTasks)
router.get('/:id', getTaskById)
router.post('/', uploadAnyFile.single('file'), createTask, controlarErros)
router.put('/:userId/tasks/:taskId',uploadAnyFile.single('file'), editTask, controlarErros)
router.delete('/:id', deleteTask)

router.get('*', (req, res) => res.end('..task/POST: Não existe a rota'))
router.post('*', (req, res) => res.end('..task/GET: Não existe a rota'))
router.put('*', (req, res) => res.end('..task/PUT: Não existe a rota'))
router.delete('*', (req, res) => res.end('..task/DELETE: Não existe a rota'))

export default router;
