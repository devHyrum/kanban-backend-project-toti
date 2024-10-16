import { TaskHistory } from '../models/taskHistoryModel.js'

export const getTaskHistory = async (req, res) =>{
  try{
    const historical = await TaskHistory.getHistory()
    res.json(historical)
  }
  catch (error){
    console.error('Erro ao buscar históricos:', error)
    res.status(500).json({ error: 'Erro ao buscar históricos' })
  }
}

export const getTaskHistorybyId = async (req, res) => {
  try {
    const { id } = req.params

    const history = await TaskHistory.getHistoryByTaskId(id)

    if (!history.length) {
      return res.status(404).json({ message: 'Nenhum histórico encontrado para essa tarefa.' })
    }

    res.json(history)
  } catch (error) {
    console.error('Erro ao buscar histórico:', error)
    res.status(500).json({ error: 'Erro ao buscar o histórico da tarefa' })
  }
}