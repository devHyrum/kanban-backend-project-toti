import express from 'express';
import * as taskCommentsController from '../controllers/taskCommentsController.js';

const router = express.Router();

router.get('/', taskCommentsController.getTaskComments);
router.get('/:taskId/comments', taskCommentsController.getCommentsByTaskId);
router.post('/:taskId/comments', taskCommentsController.createComment);
router.delete('/comments/:id', taskCommentsController.deleteComment);

export default router;