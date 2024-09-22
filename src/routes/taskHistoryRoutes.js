import express from 'express'
import { getTaskHistory } from '../controllers/taskHistoryController.js'

const router = express.Router()

// Rota para obter o histórico de uma tarefa específica pelo ID
router.get('/:id', getTaskHistory)

export default router
