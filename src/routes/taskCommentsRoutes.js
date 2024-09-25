import express from 'express';
import { addTaskComments, deleteComment, getCommentsByTaskId, getTaskComments } from '../controllers/taskCommentsController.js';

const router = express.Router();

router.get('/', getTaskComments);
router.get('/:taskId', getCommentsByTaskId);
router.post('/', addTaskComments);
router.delete('/:id', deleteComment);

router.get('*', (req, res) => res.end('..taskComments/POST: Não existe a rota'))
router.post('*', (req, res) => res.end('..taskComments/GET: Não existe a rota'))
router.delete('*', (req, res) => res.end('..taskComments/DELETE: Não existe a rota'))

export default router;