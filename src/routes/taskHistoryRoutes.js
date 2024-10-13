import express from 'express'
import { getTaskHistory, getTaskHistorybyId } from '../controllers/taskHistoryController.js'

const router = express.Router()

router.get('/:id', getTaskHistorybyId)
router.get('/', getTaskHistory)

router.get('*', (req, res) => res.end('..taskHistory/GET: Não existe a rota'))
router.get('*', (req, res) => res.end('..taskHistory/GET: Não existe a rota'))

export default router
