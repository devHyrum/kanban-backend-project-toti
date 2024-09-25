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
        if (!comments.length) {
            return res.status(404).json({ error: 'Comentários não encontrados da task' })
          }
        res.json(comments);
    }catch(error){
        res.status(500).json({erro: 'Erro ao buscar o comentário'})
    }
};

export const addTaskComments = async(req, res) => {
    const { task_id, user_id, comment } = req.body; 
    console.log('Dados recebidos:', req.body);
    try{
        const addTaskComment = await TaskComment.addComment(task_id, user_id, comment)
        res.json({message:'Comentário adicionado', comment: {task_id, user_id, comment}})
    }catch(error){
        res.status(500).json({erro: 'Erro ao adicionar comentário'})
        throw error;
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