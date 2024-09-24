import express from 'express'
import taskListController from '../controllers/taskListControllers.js'

const router = express.Router();

router.get('/', taskListController.getTaskList)

export default router;