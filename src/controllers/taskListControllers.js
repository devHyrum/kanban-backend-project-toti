import TaskList from "../models/taskListModels.js";

export const getTaskList = async (req, res) => {
    try{
        const task_lists = await TaskList.getAll()
        res.json(task_lists)
    }catch(error){
        res.status(500).json({erro: 'Erro ao buscar tarefas'})
    }       
}
export default {getTaskList};