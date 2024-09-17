import Task from '../models/taskModel.js'

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' })
  }
}

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, priority, userId, categoryId, taskListId } = req.body
    const filePath = req.file ? req.file.path : null

    const result = await Task.create(title, description, dueDate, status, priority, userId, categoryId, taskListId, filePath)
    res.json({ message: 'Tarefa criada com sucesso', taskId: result.insertId })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' })
  }
}
