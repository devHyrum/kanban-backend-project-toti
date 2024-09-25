import express from 'express'
import taskListController from '../controllers/taskListControllers.js'

const router = express.Router();

router.get('/', taskListController.getTaskList)

router.get('*', (req, res) => res.end('..taskList/GET: Não existe a rota'))

export default router;