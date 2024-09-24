import TaskComment from '../models/taskCommentsModel.js';

export const getTaskComments = async (req, res) => {
    try{
        const task_Comments = await TaskComment.getAllComments()
        res.json(task_Comments)
    }catch(error){
        res.status(500).json({erro: 'Erro ao buscar Comentários!'})
    }
};

export const getCommentsByTaskId = async (req, res) => {
    try{
        const comments = await TaskComment.getAllByTaskId(req.params.taskId);
        res.json(comments);
    }catch(error){
        res.status(500).json({erro: 'Erro ao buscar o comentário'})
    }
};

export const createComment = async (req, res) => {
    try{
        const { comment, userId } = req.body;
        const taskId = req.params.taskId;
        const result = await TaskComment.create(taskId, comment, userId);
        res.status(201).json({ message: 'Comentario creado', commentId: result.insertId });
    }catch(error){
        res.status(500).json({erro: 'Erro ao adicionar comentário'})
    }
};

export const deleteComment = async (req, res) => {
    try{
        const result = await TaskComment.delete(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }
        res.json({ message: 'Comentario eliminado' });
    }catch(error){
        res.status(500).json({erro: 'Erro ao deletar Comentário!'})
    }
};