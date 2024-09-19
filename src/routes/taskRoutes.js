import express from 'express'
import taskController from '../controllers/taskController.js'
import upload from '../config/multer.js'

const router = express.Router()

router.post('/', upload.single('file'), taskController.createTask)
router.get('/', taskController.getTasks)
// router.get('/:id', taskController.getTaskById)
// router.put('/:id', upload.single('file'), taskController.updateTask)
// router.delete('/:id', taskController.deleteTask)

export default router;
